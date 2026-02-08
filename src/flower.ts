import {
  getItemFromLocalStorage,
  removeFlowerFromLocalStorage,
  ToggleFlowerByIdFromLocalStorage,
  updatePlayerInLocalStorage,
} from "./localStorage";
import { isColliding, Player } from "./player";

export const WORLD_SIZE = 6000;
export const FLOWER_SIZE = 50;
export const FLOWER_COUNT = 130

export enum ASSET_SIZE {
  "150PX" = 150,
  "100PX" = 100,
  "50PX" = 50,
  "25PX" = 25,
}
const messages = [
  "Tabark, you make my world softer just by being in it 💖",
  "Deba, my heart chose you and it keeps choosing you every day",
  "I smile like an idiot every time I think about you, Tabark",
  "Deba el sammen ❤️ you’re my favorite place to rest",
  "Loving you feels easy, natural, and endlessly beautiful",
  "Tabark, you’re the calm in my chaos and the joy in my days",
  "Deba, you own a piece of my heart and I don’t want it back",
  "Every moment with you feels like a small miracle",
  "Tabark, your laugh is my favorite sound in the world",
  "Deba ❤️ you’re my comfort, my love, my home",
  "I didn’t know what I was missing until you walked into my life",
  "Tabark, being yours is my favorite thing",
  "Deba, even silence with you feels warm",
  "I love you more than words, more than distance, more than time",
  "Tabark ❤️ you’re my forever kind of love",
];

function randomBetween(min: number, max: number) {
  const { x, y } = Player.getPlayerInstance().getCoordinates();
  const position = Math.random() * (max - min) + min;

  const differenceX = Math.abs(position - x);
  const differenceY = Math.abs(position - y);

  if (differenceX <= 40 || differenceY <= 40) {
    console.log(differenceX, differenceY);
    return randomBetween(min, max);
  }
  return position;
}

function randomColor(color_array: string[]) {
  return color_array[Math.floor(Math.random() * color_array.length)];
}

function randomMessage() {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

export function generateFlowers(FLOWER_COUNT: number): flower[] {
  const flowers: flower[] = [];

  for (let i = 0; i < FLOWER_COUNT; i++) {
    flowers.push({
      id: i + 1,
      message: randomMessage(),
      x: randomBetween(0, WORLD_SIZE - FLOWER_SIZE),
      y: randomBetween(0, WORLD_SIZE - FLOWER_SIZE),
      color: randomColor(["red", "blue", "green", "purple"]) as FlowerColor,
      collected: false,
    });
  }

  return flowers;
}

export const showMessageDialog = ({
  message,
  messageElement,
  overlay,
}: messageDialog) => {
  messageElement.textContent = message;
  overlay.classList.remove("hidden");
};

export const CloseDialog = (overlay: HTMLDivElement) => {
  overlay.classList.add("hidden");
};

export const setFlowers = (world: HTMLDivElement) => {
  const flowers = getItemFromLocalStorage("flowers") as flower[];

  flowers?.forEach((flower: flower) => {
    if (flower.collected) return;

    const flower_node = document.createElement("img");

    flower_node.style.left = `${flower.x}px`;
    flower_node.style.top = `${flower.y}px`;

    flower_node.src = `/2D-GAME/assets/spirts/${flower.color}_flower.png`;
    flower_node.classList = `flower_asset flower_${flower.id} `;

    world.appendChild(flower_node);
  });
};

export const resetFlowersUI = () => {
  const flowers = getItemFromLocalStorage("flowers") as flower[];

  flowers?.forEach((flower: flower) => {
    document.querySelector<HTMLImageElement>(`.flower_${flower.id}`)?.remove();
  });
};

export const flowersCollectedResetAndIteration = () => {
  const player = getItemFromLocalStorage("player") as PlayerStorage;

  if (!player) return;

  const flowers: PlayerStorage["flowers_collected"] = {
    red: 0,
    green: 0,
    blue: 0,
    purple: 0,
  };

  const newPlayerObject: PlayerStorage = {
    ...player,
    iterations: player.iterations + 1,
    flowers_collected: flowers,
  };

  localStorage.setItem("player", JSON.stringify(newPlayerObject));
};

export const toggleFlower = (flowers: flower[]) => {
  flowers?.forEach((flower: flower) => {
    if (flower.collected) {
      const flr = document.querySelector<HTMLImageElement>(
        `.flower_${flower.id}`,
      )!;

      if (!flr) return;

      flr.style.display = "none";

      updatePlayerInLocalStorage(flower.color);

      ToggleFlowerByIdFromLocalStorage(flower.id);
    }
  });
};

export const updateFlowersUi = () => {
  const player = getItemFromLocalStorage("player") as PlayerStorage;

  if (!player) return;

  const flowersCollected = player.flowers_collected;

  Object.entries(flowersCollected).forEach(([key, value]) => {
    const colorNode = document.querySelector<HTMLParagraphElement>(
      `.counter .${key}`,
    )!;

    colorNode.innerText = `${value}`;
  });
};

export const seedStaticAssets = ({
  asset_type,
  count,
  asset_color,
  asset_size,
}: seedStaticAssetsProps): static_assets[] => {
  const assets: static_assets[] = [];
  for (let i = 0; i <= count; i++) {
    assets.push({
      id: i + 1,
      type: asset_type,
      size: asset_size,
      x: randomBetween(0, WORLD_SIZE - asset_size),
      y: randomBetween(0, WORLD_SIZE - asset_size),
      color: randomColor(asset_color) as asset_color,
    });
  }
  return assets;
};

export const setStaticAssets = (world: HTMLDivElement) => {
  const assets = getItemFromLocalStorage("assets") as static_assets[];

  if (!assets) return;

  console.log(assets);

  assets.forEach((asset) => {
    const asset_node = document.createElement("img");

    asset_node.className = "static_asset";

    asset_node.style.left = `${asset.x}px`;
    asset_node.style.top = `${asset.y}px`;

    asset_node.style.width = `${asset.size}px`;
    asset_node.style.height = `${asset.size}px`;

    if (asset.type === "shrub") {
      asset_node.style.zIndex = "100";
    }

    asset_node.src = `/2D-GAME/assets/spirts/${asset.color}_${asset.type}.png`;

    world.appendChild(asset_node);
  });
};

export function startLoading({
  progressBar,
  loadingBox,
  onDone,
}: loading_props) {
  let value = 0;

  const interval = setInterval(() => {
    value += Math.ceil(Math.random() * 6) + 1; // feels organic 🌱

    if (value >= 100) {
      value = 100;
      progressBar.style.width = value + "%";

      clearInterval(interval);

      setTimeout(() => {
        loadingBox.remove();
        onDone();
      }, 300);
    } else {
      progressBar.style.width = value + "%";
    }
  }, 50);
}

export const seedAllStaticAssets = (): static_assets[] => {
  const shrubs = seedStaticAssets({
    asset_type: "shrub",
    count: 30,
    asset_color: ["red", "green"],
    asset_size: ASSET_SIZE["100PX"],
  });

  const fallen_flowers = seedStaticAssets({
    asset_type: "fallen_flowers",
    count: 60,
    asset_color: ["green"],
    asset_size: ASSET_SIZE["100PX"],
  });

  return [...shrubs, ...fallen_flowers];
};

export const staticAssetCollidingEffect = (assets: static_assets[]) => {
  const player = Player.getPlayerInstance();
  const playerBox = player.getPlayerBox();
  assets?.forEach((asset) => {
    if (asset.type !== "shrub") return;
    const assetBox = {
      x: asset.x,
      y: asset.y,
      width: asset.size,
      height: asset.size,
    };
    const newPlayerBox = {
      ...playerBox,
      width: playerBox.width - 36,
      height: playerBox.height - 37,
    };

    if (isColliding(newPlayerBox, assetBox)) {
      player.is_moving = false;
      return;
    }
  });
};

type flowerCollidingProps = {
  flowers: flower[];
  messageElement: HTMLDivElement;
  overlay: HTMLDivElement;
};

export const flowersCollidingEffect = ({
  flowers,
  overlay,
  messageElement,
}: flowerCollidingProps) => {
  const player = Player.getPlayerInstance();
  const playerBox = player.getPlayerBox();
  flowers?.forEach((flower: flower) => {
    if (flower.collected) return;
    const flowerBox = {
      x: flower.x,
      y: flower.y,
      width: 50,
      height: 50,
    };

    if (isColliding(playerBox, flowerBox)) {
      flower.collected = true;

      player.is_moving = false;

      toggleFlower(flowers);

      updateFlowersUi();

      showMessageDialog({ message: flower.message, overlay, messageElement });

      removeFlowerFromLocalStorage(flower.id);

      return;
    }
  });
};
