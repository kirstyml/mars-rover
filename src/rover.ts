import { Coord, Position, directions, DirectionType, instructions, InstructionType } from "./types"

export class Rover {
    plateau: Coord;
    position: Position;

    constructor(plateau: Coord, position: Position) {
        this.plateau = plateau;
        this.position = position;
    }

    move(instructions: Array<string>) {
        this.position = takeInstructions(this.position, this.plateau, instructions);
    }
};

//TODO: can get Array<InstructionType> working
export function takeInstructions(initialPosition: Position, plateauCoord: Coord, instructionSet: Array<string>) {
    let nextPosition = { ...initialPosition }
    for (let i = 0; i <= instructionSet.length - 1; i++) {
        const inst = instructionSet[i];
        if(inst === "L" || inst === "R" || inst === "M") {
            nextPosition = makeMove(nextPosition, plateauCoord, inst);
        }
        else console.log("invalid move.");
    }
    return nextPosition;
}

export function isValidMove(position: Position, plateauCoord: Coord) {
    return position.x <= plateauCoord.x && position.y <= plateauCoord.y;
}

//TODO: can get Array<InstructionType> working
export function makeMove(initialPosition: Position, plateauCoord: Coord, instruction: InstructionType) {
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
        if (!isValidMove(endPosition, plateauCoord)) {
            return initialPosition;
        }
    }

    return endPosition;
}