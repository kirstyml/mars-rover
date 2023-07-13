import { Coord } from "./types";

export class Plateau {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;

  constructor(maxCoord: Coord) {
    this.maxX = maxCoord.x;
    this.maxY = maxCoord.y;
    this.minX = 0;
    this.minY = 0;
  }
}
