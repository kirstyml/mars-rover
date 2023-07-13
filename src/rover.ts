import { Position } from "./types";

export class Rover {
  id: number;
  position: Position;

  constructor(id = 1, position: Position) {
    this.id = id;
    this.position = position;
  }
}
