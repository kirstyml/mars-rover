import { Position, directions, InstructionType } from "./types"
import { Plateau } from "./plateau";

export class Rover {
    id: number;
    plateau: Plateau;
    position: Position;

    constructor(id = 1, plateau: Plateau, position: Position) {
        if (!isValidMove(position, plateau, id)) {
            throw new Error("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover")
        }
        this.id = id;
        this.plateau = plateau;
        this.position = position;
        plateau.addRover(this);
    }

    move(instructions: Array<InstructionType>) {
        this.position = takeInstructions(this.position, this.plateau, instructions, this.id);
        this.plateau.updatePositions({ id: this.id, position: this.position });
    }
}

//TODO: can get Array<InstructionType> working
export function takeInstructions(initialPosition: Position, plateau: Plateau, instructionSet: Array<InstructionType>, id: number) {
    let nextPosition = { ...initialPosition }
    for (let i = 0; i <= instructionSet.length - 1; i++) {
        const inst = instructionSet[i];
        if (inst === "L" || inst === "R" || inst === "M") {
            nextPosition = makeMove(nextPosition, plateau, inst, id);
        }
        else console.log("invalid move.");
    }
    return nextPosition;
}

export function isValidMove(position: Position, plateau: Plateau, id: number) {
    const xPositionValid = position.x <= plateau.maxX && position.x >= plateau.minX;
    const yPositionValid = position.y <= plateau.maxY && position.y >= plateau.minY;
    const roverPositions = plateau.roverPositions;
    let roverInWay = false;
    roverPositions.forEach(otherRoverPosition => {
        if (id !== otherRoverPosition.id && position.x === otherRoverPosition.position.x && position.y === otherRoverPosition.position.y) {
            roverInWay = true;
        }
    });
    return xPositionValid && yPositionValid && !roverInWay;
}

export function makeMove(initialPosition: Position, plateau: Plateau, instruction: InstructionType, id: number) {
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
        if (!isValidMove(endPosition, plateau, id)) {
            return initialPosition;
        }
    }

    return endPosition;
}