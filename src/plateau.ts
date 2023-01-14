import { Coord, RoverRef } from "./types";
import { Rover } from "./rover";

export class Plateau {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    roverPositions: Array<RoverRef>;

    constructor(maxCoord: Coord, roverPositions: Array<RoverRef> = []) {
        this.maxX = maxCoord.x;
        this.maxY = maxCoord.y;
        this.minX = 0;
        this.minY = 0;
        this.roverPositions = roverPositions;
    }

    getRoverPositions() {
        return this.roverPositions.map(roverRef => roverRef.position);
    }

    addRover(newRover: Rover) {
        this.roverPositions.push({ id: newRover.id, position: newRover.position });
    }

    updatePositions(update: RoverRef) {
        const updateRovers = this.roverPositions.map(roverRef => {
            if (roverRef.id === update.id) {
                return update;
            }
            return roverRef;
        })
        this.roverPositions = updateRovers;
    }
}