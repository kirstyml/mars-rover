import { Coord, Position, directions, DirectionType, instructions, InstructionType } from "./types"
import { Plateau } from "./plateau";

export class Rover {
    id: number;
    plateau: Plateau;
    position: Position;

    constructor(id: number = 1, plateau: Plateau, position: Position) {
        if (!isValidMove(position, plateau)) {
            throw new Error("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover")
        }
        this.id = id;
        this.plateau = plateau;
        this.position = position;
        plateau.addRover(this);
    }

    move(instructions: Array<string>) {
        this.position = takeInstructions(this.position, this.plateau, instructions);
        this.plateau.updatePositions({ id: this.id, position: this.position });
    }
};

//TODO: can get Array<InstructionType> working
export function takeInstructions(initialPosition: Position, plateau: Plateau, instructionSet: Array<string>) {
    let nextPosition = { ...initialPosition }
    for (let i = 0; i <= instructionSet.length - 1; i++) {
        const inst = instructionSet[i];
        if (inst === "L" || inst === "R" || inst === "M") {
            nextPosition = makeMove(nextPosition, plateau, inst);
        }
        else console.log("invalid move.");
    }
    return nextPosition;
}

export function isValidMove(position: Position, plateau: Plateau) {
    const xPositionValid = position.x <= plateau.maxX && position.x >= plateau.minX;
    const yPositionValid = position.y <= plateau.maxY && position.y >= plateau.minY;
    const roverPositions = plateau.getRoverPositions();
    let roverInWay = false;
    roverPositions.forEach(otherRoverPosition => {
        if (position.x === otherRoverPosition.x && position.y === otherRoverPosition.y) {
            roverInWay = true;
        }
    });
    return xPositionValid && yPositionValid && !roverInWay;
}

//TODO: can get Array<InstructionType> working
export function makeMove(initialPosition: Position, plateau: Plateau, instruction: InstructionType) {
    const endPosition = { ...initialPosition };
    const indexCurrentDirection = directions.indexOf(initialPosition.direction);
    // spin left if L
    if (instruction === "L") {
        endPosition.direction = directions[indexCurrentDirection === 0 ? 3 : indexCurrentDirection - 1];
    }
    // spin right if R
    if (instruction === "R") {
        endPosition.direction = directions[indexCurrentDirection === 3 ? 0 : indexCurrentDirection + 1];
    }
    // move 1 space in current direction
    if (instruction === "M") {
        if (initialPosition.direction === 'N') {
            endPosition.y += 1;
        }
        if (initialPosition.direction === 'S') {
            endPosition.y -= 1;
        }
        if (initialPosition.direction === 'E') {
            endPosition.x += 1;
        }
        if (initialPosition.direction === 'W') {
            endPosition.x -= 1;
        }
        // validate if can make move
        if (!isValidMove(endPosition, plateau)) {
            return initialPosition;
        }
    }

    return endPosition;
}