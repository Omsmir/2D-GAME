import {
  CloseDialog,
  FLOWER_COUNT,
  flowersCollidingEffect,
  generateFlowers,
  seedAllStaticAssets,
  setFlowers,
  setStaticAssets,
  startLoading,
  staticAssetCollidingEffect,
  updateFlowersUi,
} from "./flower";
import { game_main_layout } from "./game_board";
import {
  getItemFromLocalStorage,
  newGame,
  reset,
  startGame,
} from "./localStorage";
import { Player, updatePlayerName } from "./player";
import "./style.css";
document.querySelector<HTMLDivElement>(".container")!.innerHTML =
  game_main_layout;
const board = document.querySelector<HTMLDivElement>(".layout")!;
const world = document.querySelector<HTMLDivElement>(".main_board")!;
const character =
  document.querySelector<HTMLImageElement>(".character_layout")!;
const dialog = document.querySelector<HTMLDivElement>(".dialog")!;
const game_initial_form =
  document.querySelector<HTMLFormElement>(".name-form")!;
const name = document.querySelector<HTMLInputElement>(".name-input")!;
const error = document.querySelector<HTMLSpanElement>(".error_message")!;
const overlay = document.querySelector<HTMLDivElement>(".dialog-overlay")!;
const messageElement =
  document.querySelector<HTMLParagraphElement>(".dialog-message")!;
const closeBtn = document.querySelector<HTMLButtonElement>(".dialog-close")!;
const loadingScreen =
  document.querySelector<HTMLDivElement>(".loading-screen")!;
const progressBar =
  document.querySelector<HTMLDivElement>(".loading-progress")!;

const player_name =
  document.querySelector<HTMLParagraphElement>(".player_name")!;

const reset_button =
  document.querySelector<HTMLButtonElement>(".counter .reset")!;

const newGameButton =
  document.querySelector<HTMLButtonElement>(".counter .new-game")!;
const player_in_storage = getItemFromLocalStorage("player");

const player = Player.getPlayerInstance();

if (!player_in_storage) {
  dialog.style.display = "flex";

  // starter form
  game_initial_form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!name.value) {
      error.innerText = "please enter your name to start playing";
      return;
    }
    if (name.value.length > 10 || name.value.length < 4) {
      error.innerText = "name max and min length are 10 and 4 characters";
      return;
    }
    error.innerText = "";

    const player: Partial<PlayerStorage> = {
      name: `${name.value}`,
      iterations: 1,
      flowers_collected: {
        red: 0,
        green: 0,
        blue: 0,
        purple: 0,
      },
    };

    loadingScreen.classList.remove("hidden");

    startLoading({
      progressBar,
      loadingBox: loadingScreen,
      onDone: () => {
        const localFlowers = generateFlowers(FLOWER_COUNT);

        const static_assets = seedAllStaticAssets();

        startGame(player, localFlowers, static_assets);

        setFlowers(world);

        setStaticAssets(world);

        updatePlayerName(player_name);

        updateFlowersUi();
      },
    });

    dialog.style.display = "none";
  });
}

if (player_in_storage) {
  setFlowers(world);

  setStaticAssets(world);

  updatePlayerName(player_name);

  updateFlowersUi();
}

let target = { x: 1500, y: 1500 };

const BOARD_WIDTH = board.clientWidth; // currently 940 inner width + padding
const BOARD_HEIGHT = board.clientHeight; //   540 inner height + padding

const SPEED = 2; // the foot or click steps by pixels

board.addEventListener("click", (e) => {
  const rect = board.getBoundingClientRect();
  player.is_moving = true;

  // the points where you want to move the player inside the world coordinates

  target.x = e.clientX - rect.left + camera.x; // mouse at specific width inside the layout width - the most left of the same layout plus the camera horizantal viewport pixels
  target.y = e.clientY - rect.top + camera.y;
});

let camera = { x: 0, y: 0 }; // camera view that keeps the player at a specific position relative to the world coordinates

function update() {
  const { x, y } = player.getCoordinates();
  // Move player
  const dx = target.x - x; // the amount of pixels that the player needs to move either to the right or the left
  const dy = target.y - y; // the amount of pixels that the player needs to move either to the top or the bottom

  const dist = Math.hypot(dx, dy);

  if (dist > 1 && player.is_moving) {
    const newX = x + (dx / dist) * SPEED;
    const newY = y + (dy / dist) * SPEED;
    player.setCoordinates({ x: newX, y: newY });
  }

  // Camera follows player
  camera.x = x - BOARD_WIDTH / 2 + 50;

  camera.y = y - BOARD_HEIGHT / 2;

  world.style.transform = `translate(${-camera.x}px, ${-camera.y}px)`;

  // Move world

  // Draw player centered
  character.style.left = `${x - 32}px`;
  character.style.top = `${y - 32}px`;

  const flowers = getItemFromLocalStorage("flowers") as flower[];
  const assets = getItemFromLocalStorage("assets") as static_assets[];

  flowersCollidingEffect({ flowers, overlay, messageElement });

  staticAssetCollidingEffect(assets);

  requestAnimationFrame(update);
}

closeBtn.addEventListener("click", () => {
  CloseDialog(overlay);
});

overlay.addEventListener("click", (e) => {
  if (e.target == overlay) {
    CloseDialog(overlay);
  }
});

update();

// reseting the game and playing again

reset(reset_button);

newGame(newGameButton, world);
