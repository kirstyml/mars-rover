import { Coord, RoverWithPosition } from "./types";
import { Rover } from "./rover";

export class Plateau {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    roverPositions: Array<RoverWithPosition>;

    constructor(maxCoord: Coord, roverPositions: Array<RoverWithPosition> = []) {
        this.maxX = maxCoord.x;
        this.maxY = maxCoord.y;
        this.minX = 0;
        this.minY = 0;
        this.roverPositions = roverPositions;
    }

    getRoverPositions() {
        return this.roverPositions.map(roverWithPosition => roverWithPosition.position);
    }

    addRover(newRover: Rover) {
        this.roverPositions.push({ id: newRover.id, position: newRover.position });
    }

    updatePositions(updatedRoverWithPosition: RoverWithPosition) {
        const updatedPositions = [
            ...this.roverPositions.filter(p => p.id !== updatedRoverWithPosition.id),
            updatedRoverWithPosition
        ];
        if(this.roverPositions.length === updatedPositions.length) {
            this.roverPositions = updatedPositions;
        }
    }
}