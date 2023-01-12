import { Coord, Position, directions, instructions, InstructionType } from "./types"
import { Rover } from "./rover"

export function isValidCoord(inputCoord : string) : Boolean {
    const coordArray = inputCoord.split(" ");
    return coordArray.length === 2 && coordArray.every(item => /\d/.test(item));
}

export function inputToCoord(inputCoord : string) : Coord {
    const coordArray = inputCoord.split(" ");
    return {
        x: parseInt(coordArray[0]),
        y: parseInt(coordArray[1])
    }
};

export function setPlateauCoord(inputCoord: string) {
    if (isValidCoord(inputCoord)) {
        return inputToCoord(inputCoord);
    }
    else throw new Error("Not a valid coordinate. Must be number space number");
}

function inputToPosition(inputPosition : string) : Position {
    if (inputPosition[4] === "N" || inputPosition[4] === "E" || inputPosition[4] === "S" || inputPosition[4] === "W" ) {
        return {
            x: parseInt(inputPosition[0]),
            y: parseInt(inputPosition[2]),
            direction: inputPosition[4]
        }
    }
    else throw new Error("not a valid position. Direction must be a compass point");
};

export function setInitialPosition(inputPosition: string) : Position {
    // if(isValidPosition(inputPosition)) {
        return inputToPosition(inputPosition)
    // }
}

//TODO: can get Array<InstructionType> working
export function setInstructionSet(instructions: string) : Array<string> {
    const instructionArray = instructions.split("");
    return instructionArray;
}

export function createRover(plateauInput: string, positionInput: string) {
    const plateauCoord = setPlateauCoord(plateauInput);
    const initialPosition = setInitialPosition(positionInput);
    return new Rover(plateauCoord, initialPosition);
}

export function moveRover(rover: Rover, instructionsInput: string) {
    const instructionsArray = setInstructionSet(instructionsInput);
    rover.move(instructionsArray);
    return rover.position;
}

