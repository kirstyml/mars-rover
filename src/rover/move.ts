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

export function moveRover(initialPosition: Position, plateauCoord: Coord, instruction: InstructionType) {
    const endPosition = {...initialPosition};
    const indexCurrentDirection = directions.indexOf(initialPosition.direction);
    // spin left if L
    if (instruction === "L") {    
        endPosition.direction = directions[indexCurrentDirection === 0 ? 3: indexCurrentDirection - 1];
    }
    // spin right if R
    if (instruction === "R") {
        endPosition.direction = directions[indexCurrentDirection === 3 ? 0: indexCurrentDirection + 1];
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
        // TODO: validate if can make move
    }

    return endPosition;
}