/**
 * This file contains the console functions that make up the user interface of the app
 */
import * as readline from 'node:readline';
import { input, inputWithValidation, print } from './console_helpers';
import { createRover, moveRover, isValidCoord, isAPositiveInteger, isValidPosition, isValidInstructions, setPlateau } from './controller';
import { Plateau } from './plateau';
import { Rover } from './rover';

export class RoverConsole {
	reader: readline.Interface;

	constructor(reader: readline.Interface) {
		this.reader = reader;
	}
	
	async promptForPlateauSize() {
		const inputPlateau = await inputWithValidation(
			this.reader,
			"Enter the maximum Plateau Coord (number number):",
			isValidCoord,
			"Incorrect formatting. Please enter coordinate again"
		);
		const plateau = setPlateau(inputPlateau);
		return plateau;
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
	
	async promptForRoverLandingPositions(numberOfRovers: string, plateau: Plateau) {
		const rovers = []
		for (let i = 1; i <= parseInt(numberOfRovers); i++) {
			const inputPosition = await inputWithValidation(
				this.reader,
				`Enter the rover ${i} initial position (number number direction):`,
				isValidPosition,
				"Your input is not of the format x y direction"
			);
			const rover = createRover(i, plateau, inputPosition);
			print("Rover created");
			rovers.push(rover);
		}
		return rovers;
	}
	
	async promptForRoverMoveInstructions (rovers: Array<Rover>) {
		let inputAdditionalMoves = "Y";
		if (inputAdditionalMoves === "Y") {
			do {
				for (let i = 0; i < rovers.length; i++) {
					const inputInstructions = await inputWithValidation(
						this.reader,
						`Enter instructions to move Rover ${rovers[i].id} (L,R or M):`,
						isValidInstructions,
						"Invalid set of instructions. Must only contain L, R or M"
					);
					const currentPosition = moveRover(rovers[i], inputInstructions);
					console.log(`Rover ${rovers[i].id} current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`);
				}
				inputAdditionalMoves = await input(this.reader, "Would you like to move the Rovers again? Y/N");
			} while (inputAdditionalMoves === "Y");
		}
	}

	end(): void {
		this.reader.close();
		console.log("Goodbye!");
	}
}