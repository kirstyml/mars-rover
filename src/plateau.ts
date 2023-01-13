import { Coord } from "./types";
import { Rover } from "./rover";

export class Plateau {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    rovers: Array<Rover>;

    constructor(maxCoord: Coord) {
        this.maxX = maxCoord.x;
        this.maxY = maxCoord.y;
        this.minX = 0;
        this.minY = 0;
        this.rovers = [];
    }

    getRoverPositions() {
        return this.rovers.map(rover => rover.position);
    }

    addRover(newRover: Rover) {
        this.rovers.push(newRover);
    }
}