interface Coord {
    x: number,
    y: number
};

const directions = ["N", "E", "S", "W"] as const;
type DirectionType = typeof directions[number];

interface Position {
    x: number,
    y: number,
    direction: DirectionType
};

const instructions = ["L", "R", "M"] as const;
type InstructionType = typeof instructions[number];

export function takeInstructions(initialPosition: Position, plateauCoord: Coord, instructionSet: Array<InstructionType>) {
    let nextPosition = { ...initialPosition }
    for (let i = 0; i <= instructionSet.length - 1; i++) {
        nextPosition = moveRover(nextPosition, plateauCoord, instructionSet[i]);
    }
    return nextPosition;
}

export function isValidMove(position: Position, plateauCoord: Coord) {
    return position.x <= plateauCoord.x && position.y <= plateauCoord.y;
}

export function moveRover(initialPosition: Position, plateauCoord: Coord, instruction: InstructionType) {
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