import { getItemFromLocalStorage } from "./localStorage";

export class Player {
  public static instance: Player;
  private x: number;
  private y: number;
  private readonly PLAYER_SIZE: number;
  public is_moving: boolean;
  constructor() {
    this.x = 1500;
    this.y = 1500;
    this.PLAYER_SIZE = 30;
    this.is_moving = false;
  }

  public static getPlayerInstance = () => {
    if (!Player.instance) {
      this.instance = new Player();
    }
    return Player.instance;
  };

  setCoordinates = ({ x, y }: { x?: number; y?: number }) => {
    if (x) {
      this.x = x;
    }
    if (y) {
      this.y = y;
    }
  };

  getCoordinates = (): { x: number; y: number } => {
    return { x: this.x, y: this.y };
  };

  getPlayerBox = () => {
    return {
      x: this.x,
      y: this.y,
      width: this.PLAYER_SIZE,
      height: this.PLAYER_SIZE + 30,
    };
  };
}

export const isColliding = (a: any, b: any) => {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
};


export const updatePlayerName = (player_name: HTMLParagraphElement) => {
  if(!player_name) return

  const nameFromLocalStorage = getItemFromLocalStorage(
    "player",
  ) as PlayerStorage;

  if (!nameFromLocalStorage) return;
  player_name.innerText = nameFromLocalStorage.name;
};



