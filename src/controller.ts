import { Coord, Position, directions, instructions, InstructionType } from "./types";
import { Rover } from "./rover";
import { Plateau } from "./plateau";

export function isValidCoord(inputCoord: string): boolean {
    const coordArray = inputCoord.split(" ");
    return coordArray.length === 2 && coordArray.every(item => /^\d+$/.test(item));
}

export function inputToCoord(inputCoord: string): Coord {
    const coordArray = inputCoord.split(" ");
    return {
        x: parseInt(coordArray[0]),
        y: parseInt(coordArray[1])
    }
};

export function setPlateau(inputCoord: string) {
    if (isValidCoord(inputCoord)) {
        const validCoord = inputToCoord(inputCoord);
        return new Plateau(validCoord);
    }
    else throw new Error("Not a valid coordinate. Must be number space number");
}

export const isAPositiveInteger = (input: string) => {
	const int = parseInt(input);
	return !isNaN(int) && int > 0;
}

export function inputToPosition(inputPosition: string): Position {
    const positionArray = inputPosition.split(" ");
    if (positionArray[2] === "N" || positionArray[2] === "E" || positionArray[2] === "S" || positionArray[2] === "W") {
        return {
            x: parseInt(positionArray[0]),
            y: parseInt(positionArray[1]),
            direction: positionArray[2]
        }
    }
    else throw new Error("not a valid position. Direction must be a compass point");
};

export function isValidPosition(inputPosition: string): boolean {
    const positionArray = inputPosition.split(" ");
    return positionArray.length === 3 && /^\d+$/.test(positionArray[0]) && /^\d+$/.test(positionArray[1]) && /^N|E|S|W$/.test(positionArray[2]);
}

export function setInitialPosition(inputPosition: string): Position {
    if (isValidPosition(inputPosition)) {
        return inputToPosition(inputPosition)
    }
    else throw new Error("Not a valid position. Must be number space number");
}

export function setInstructionSet(instructionsInput: string): Array<string> {
    const isValid = isValidInstructions(instructionsInput);
    if (isValid) {
        return instructionsInput.split("");
    }
    // HELP: cannot get typescript to recognise that this is an array of instructions
    // My solution is to keep as an array of strings and check type of each item in the array in the move 
    // method in the rover class.
    else throw new Error("Not a valid instruction string. Must only contain the characters L R or M");
}

export function isValidInstructions(instructionsInput: string): boolean {
    const instructionArray = instructionsInput.split("");
    return instructionArray.every(item => item === "L" || item === "R" || item === "M") && instructionArray.length > 0;
}

export function createRover(id: number = 1, plateau: Plateau, positionInput: string) {
    const initialPosition = setInitialPosition(positionInput);
    return new Rover(id, plateau, initialPosition);
}

export function moveRover(rover: Rover, instructionsInput: string) {
    const instructionsArray = setInstructionSet(instructionsInput);
    rover.move(instructionsArray);
    return rover.position;
}

