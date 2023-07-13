/**
 * This file contains the console class that makes up the user interface of the app
 */
import * as readline from "node:readline";
import { input, inputWithValidation, print } from "./console_helpers";
import {
  createRover,
  moveRover,
  isValidCoord,
  isAPositiveInteger,
  isValidPosition,
  isValidInstructions,
  setPlateau,
} from "./controller";
import { Mission } from "./mission";

export class RoverConsole {
  reader: readline.Interface;

  constructor(reader: readline.Interface) {
    this.reader = reader;
  }

  async promptForPlateauSize(mission: Mission) {
    const inputPlateau = await inputWithValidation(
      this.reader,
      "Enter the maximum Plateau Coord (number number):",
      isValidCoord,
      "Incorrect formatting. Please enter coordinate again"
    );
    setPlateau(inputPlateau, mission);
  }

  async promptForNumberOfRovers() {
    const numberOfRovers = await inputWithValidation(
      this.reader,
      "How many rovers would you like to land?:",
      isAPositiveInteger,
      "input is not a number. Please enter a positive integer"
    );
    return numberOfRovers;
  }

  async promptForRoverLandingPositions(
    numberOfRovers: string,
    mission: Mission
  ) {
    const rovers = [];
    for (let i = 1; i <= parseInt(numberOfRovers); i++) {
      const inputPosition = await inputWithValidation(
        this.reader,
        `Enter the rover ${i} initial position (number number direction):`,
        isValidPosition,
        "Your input is not of the format x y direction"
      );
      const rover = createRover(i, inputPosition, mission);
      print("Rover created");
      rovers.push(rover);
    }
    return rovers;
  }

  async promptForRoverMoveInstructions(mission: Mission) {
    let inputAdditionalMoves = "Y";
    if (inputAdditionalMoves === "Y") {
      do {
        for (let i = 0; i < mission.rovers.length; i++) {
          const inputInstructions = await inputWithValidation(
            this.reader,
            `Enter instructions to move Rover ${mission.rovers[i].id} (L,R or M):`,
            isValidInstructions,
            "Invalid set of instructions. Must only contain L, R or M"
          );
          const currentPosition = moveRover(
            mission,
            mission.rovers[i].id,
            inputInstructions
          );
          currentPosition &&
            console.log(
              `Rover ${mission.rovers[i].id} current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`
            );
        }
        inputAdditionalMoves = await input(
          this.reader,
          "Would you like to move the Rovers again? Y/N"
        );
      } while (inputAdditionalMoves === "Y");
    }
  }

  end(): void {
    this.reader.close();
    console.log("Goodbye!");
  }
}
