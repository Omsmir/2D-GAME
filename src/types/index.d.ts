
declare type FlowerColor = "red" | "green" | "blue" | "purple";
declare type asset_color = "red" | "green";
declare type asset_type = "shrub" | "fallen_flowers";

declare type flower = {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  message: string;
  color: FlowerColor;
};

declare type static_assets = {
  id: number;
  type: asset_type;
  color: asset_color;
  size:number;
  x: number;
  y: number;
};

declare type messageDialog = {
  message: string;
  overlay: HTMLDivElement;
  messageElement: HTMLParagraphElement;
};

declare type PlayerStorage = {
  name: string;
  iterations: number;
  flowers_collected: {
    red: number;
    green: number;
    blue: number;
    purple:number
  };
};

declare type loading_props = {
  progressBar: HTMLDivElement;
  loadingBox: HTMLDivElement;
  onDone: () => void;
};


declare type seedStaticAssetsProps = {
    asset_type:asset_type
    asset_color:asset_color[]
    asset_size:number
    count:number;
}