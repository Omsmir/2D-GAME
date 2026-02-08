import {
  FLOWER_COUNT,
  flowersCollectedResetAndIteration,
  generateFlowers,
  resetFlowersUI,
  setFlowers,
  updateFlowersUi,
} from "./flower";
import { Player } from "./player";

export const getItemFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);

  if (item) return JSON.parse(item);
};

export const startGame = (
  player: Partial<PlayerStorage>,
  flowers: flower[],
  static_assests: static_assets[],
) => {
  const player_from_storage = getItemFromLocalStorage("player");

  if (player_from_storage) return;

  localStorage.setItem("player", JSON.stringify(player));
  localStorage.setItem("flowers", JSON.stringify(flowers));
  localStorage.setItem("assets", JSON.stringify(static_assests));
};

export const updatePlayerInLocalStorage = (
  color: keyof PlayerStorage["flowers_collected"],
) => {
  const player = getItemFromLocalStorage("player") as PlayerStorage;

  if (!player) return;

  const new_player: PlayerStorage = {
    ...player,
    flowers_collected: {
      ...player.flowers_collected,
      [color]: player.flowers_collected[color] + 1,
    },
  };

  localStorage.setItem("player", JSON.stringify(new_player));
};

export const removeFlowerFromLocalStorage = (id: number) => {
  const flowers = getItemFromLocalStorage("flowers") as flower[];

  if (!flowers) return;

  const new_flowers = flowers.filter((flower) => flower.id !== id);

  localStorage.setItem("flowers", JSON.stringify(new_flowers));
};

export const ToggleFlowerByIdFromLocalStorage = (id: number) => {
  const flowers = getItemFromLocalStorage("flowers") as flower[];

  if (!flowers) return;

  const new_flowers = flowers.map((flower) =>
    flower.id === id ? { ...flower, collected: true } : flower,
  );

  localStorage.setItem("flowers", JSON.stringify(new_flowers));
};

export const reset = (button: HTMLButtonElement) => {
  button.addEventListener("click", () => {
    localStorage.removeItem("player");
    localStorage.removeItem("flowers");

    location.reload();
  });
};

export const newGame = (
  new_button: HTMLButtonElement,
  world: HTMLDivElement,
) => {
  new_button.addEventListener("click", () => {
    const player = getItemFromLocalStorage("player") as PlayerStorage;

    if (!player) return;

    const character = Player.getPlayerInstance();

    character.is_moving = false;

    character.setCoordinates({ x: 1500, y: 1500 });

    flowersCollectedResetAndIteration();

    const localFlowers = generateFlowers(FLOWER_COUNT);

    localStorage.setItem("flowers", JSON.stringify(localFlowers));

    resetFlowersUI();

    setFlowers(world);

    updateFlowersUi();
  });
};
