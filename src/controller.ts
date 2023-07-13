/**
 * This file contains validation and user input parsing functions
 */

import { Coord, InstructionType, Position } from "./types";
import { Mission } from "./mission";

export function isValidCoord(inputCoord: string): boolean {
  const coordArray = inputCoord.split(" ");
  return (
    coordArray.length === 2 && coordArray.every((item) => /^\d+$/.test(item))
  );
}

export function inputToCoord(inputCoord: string): Coord {
  const coordArray = inputCoord.split(" ");
  return {
    x: parseInt(coordArray[0]),
    y: parseInt(coordArray[1]),
  };
}

export function setPlateau(inputCoord: string, mission: Mission) {
  if (isValidCoord(inputCoord)) {
    const validCoord = inputToCoord(inputCoord);
    mission.createPlateau(validCoord);
    return mission.plateau;
  } else throw new Error("Not a valid coordinate. Must be number space number");
}

export const isAPositiveInteger = (input: string) => {
  const int = parseInt(input);
  return !isNaN(int) && int > 0;
};

export function inputToPosition(inputPosition: string): Position {
  const positionArray = inputPosition.split(" ");
  if (
    positionArray[2] === "N" ||
    positionArray[2] === "E" ||
    positionArray[2] === "S" ||
    positionArray[2] === "W"
  ) {
    return {
      x: parseInt(positionArray[0]),
      y: parseInt(positionArray[1]),
      direction: positionArray[2],
    };
  } else
    throw new Error("not a valid position. Direction must be a compass point");
}

export function isValidPosition(inputPosition: string): boolean {
  const positionArray = inputPosition.split(" ");
  return (
    positionArray.length === 3 &&
    /^\d+$/.test(positionArray[0]) &&
    /^\d+$/.test(positionArray[1]) &&
    /^N|E|S|W$/.test(positionArray[2])
  );
}

export function setInitialPosition(inputPosition: string): Position {
  if (isValidPosition(inputPosition)) {
    return inputToPosition(inputPosition);
  } else throw new Error("Not a valid position. Must be number space number");
}

export function setInstructionSet(
  instructionsInput: string
): Array<InstructionType> {
  const isValid = isValidInstructions(instructionsInput);
  if (isValid) {
    return instructionsInput.split("") as Array<InstructionType>;
  } else
    throw new Error(
      "Not a valid instruction string. Must only contain the characters L R or M"
    );
}

export function isValidInstructions(instructionsInput: string): boolean {
  const instructionArray = instructionsInput.split("");
  return (
    instructionArray.every(
      (item) => item === "L" || item === "R" || item === "M"
    ) && instructionArray.length > 0
  );
}

export function createRover(id = 1, positionInput: string, mission: Mission) {
  const initialPosition = setInitialPosition(positionInput);
  mission.createRover(id, initialPosition);
}

export function moveRover(
  mission: Mission,
  roverId: number,
  instructionsInput: string
) {
  const instructionsArray = setInstructionSet(instructionsInput);
  mission.moveRover(instructionsArray, roverId);
  const updatedRover = mission.rovers.find((rover) => rover.id === roverId);
  return updatedRover && updatedRover.position;
}
