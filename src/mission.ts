import { Plateau } from "./plateau";
import { Rover } from "./rover";
import { Coord, directions, InstructionType, Position } from "./types";

const emptyPlateau: Plateau = new Plateau({ x: 0, y: 0 });

export class Mission {
  plateau: Plateau;
  rovers: Array<Rover>;

  constructor(plateau = emptyPlateau, rovers : Array<Rover> = []) {
    this.plateau = plateau;
    this.rovers = rovers;
  }

  createPlateau(maxCoord: Coord) {
    this.plateau = new Plateau(maxCoord);
  }

  createRover(id: number, initialPosition: Position) {
    if (!this.#isValidMove(initialPosition, id)) {
      throw new Error(
        "Rover's initial position is invalid. Cannot land outside of the plateau or on another rover"
      );
    }
    this.rovers.push(new Rover(id, initialPosition));
  }

  moveRover(instructions: Array<InstructionType>, roverId: number) {
    const rover = this.rovers.find((rover) => rover.id === roverId);
    if (rover) {
      rover.position = this.#takeInstructions(rover, instructions);
    }
  }

  #takeInstructions(rover: Rover, instructionSet: Array<InstructionType>) {
    let nextPosition = { ...rover.position };
    for (let i = 0; i <= instructionSet.length - 1; i++) {
      const inst = instructionSet[i];
      if (inst === "L" || inst === "R" || inst === "M") {
        nextPosition = this.#makeMove(nextPosition, inst, rover.id);
      } else console.log("invalid move.");
    }
    return nextPosition;
  }

  #makeMove(
    initialPosition: Position,
    instruction: InstructionType,
    id: number
  ) {
    const endPosition = { ...initialPosition };
    const indexCurrentDirection = directions.indexOf(initialPosition.direction);
    // spin left if L
    if (instruction === "L") {
      endPosition.direction =
        directions[indexCurrentDirection === 0 ? 3 : indexCurrentDirection - 1];
    }
    // spin right if R
    if (instruction === "R") {
      endPosition.direction =
        directions[indexCurrentDirection === 3 ? 0 : indexCurrentDirection + 1];
    }
    // move 1 space in current direction
    if (instruction === "M") {
      if (initialPosition.direction === "N") {
        endPosition.y += 1;
      }
      if (initialPosition.direction === "S") {
        endPosition.y -= 1;
      }
      if (initialPosition.direction === "E") {
        endPosition.x += 1;
      }
      if (initialPosition.direction === "W") {
        endPosition.x -= 1;
      }
      // validate if can make move
      if (!this.#isValidMove(endPosition, id)) {
        return initialPosition;
      }
    }

    return endPosition;
  }

  #isValidMove(position: Position, id: number) {
    const xPositionValid =
      position.x <= this.plateau.maxX && position.x >= this.plateau.minX;
    const yPositionValid =
      position.y <= this.plateau.maxY && position.y >= this.plateau.minY;
    let roverInWay = false;
    this.rovers.forEach((rover) => {
      if (
        id !== rover.id &&
        position.x === rover.position.x &&
        position.y === rover.position.y
      ) {
        roverInWay = true;
      }
    });
    return xPositionValid && yPositionValid && !roverInWay;
  }
}
