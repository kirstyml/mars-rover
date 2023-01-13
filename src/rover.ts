import { Coord, Position, directions, DirectionType, instructions, InstructionType } from "./types"
import { Plateau } from "./plateau";

export class Rover {
    plateau: Plateau;
    position: Position;

    constructor(plateau: Plateau, position: Position) {
        this.plateau = plateau;
        this.position = position;
    }

    move(instructions: Array<string>) {
        this.position = takeInstructions(this.position, this.plateau, instructions);
    }
};

//TODO: can get Array<InstructionType> working
export function takeInstructions(initialPosition: Position, plateau: Plateau, instructionSet: Array<string>) {
    let nextPosition = { ...initialPosition }
    for (let i = 0; i <= instructionSet.length - 1; i++) {
        const inst = instructionSet[i];
        if(inst === "L" || inst === "R" || inst === "M") {
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
    // TODO: need to create noRoverInWay function, this will always be true
    // trying to compare object to object.
    const noRoverInWay = !roverPositions.includes(position);
    return xPositionValid && yPositionValid && noRoverInWay;
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