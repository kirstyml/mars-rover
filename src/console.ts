import * as readline from 'node:readline';
import { createRover, moveRover, isValidCoord, isValidPosition, isValidInstructions, setPlateau } from './controller';
import { Plateau } from './plateau';
import { Rover } from './rover';

export function print(str: string): void {
	console.log(str);
	console.log();
}

export function clear(): void {
	console.clear();
	print('------------------------------------');
}

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export async function input(textQ: string): Promise<string> {
	return new Promise((resolve) => {
		reader.question(textQ, (answer) => resolve(answer));
	});
}

export async function inputWithValidation(questionText: string, inputIsValid: (arg: string) => boolean, errorText: string) {
	let userInput = await input(questionText);
	if (!inputIsValid(userInput)) {
		console.log(errorText);
		userInput = await inputWithValidation(questionText, inputIsValid, errorText);
	}
	return Promise.resolve(userInput);
}

export function end(): void {
	reader.close();
	console.log("Goodbye!");
}

export async function consolePlateauSetup() {
	const inputPlateau = await inputWithValidation(
		"Enter the maximum Plateau Coord (number number):",
		isValidCoord,
		"Incorrect formatting. Please enter coordinate again"
	);
	const plateau = setPlateau(inputPlateau);
	return plateau;
}

const isAPositiveInteger = (input: string) => {
	const int = parseInt(input);
	return isNaN(int) && int > 0;
}

export async function consoleRoverNumberSetup() {
	const numberOfRovers = await inputWithValidation(
		"How many rovers would you like to land?:",
		isAPositiveInteger,
		"input is not a number. Please enter a positive integer"
	);
	return numberOfRovers;
}

export async function consoleRoverSetup(numberOfRovers: string, plateau: Plateau) {
	const rovers = []
	for (let i = 1; i <= parseInt(numberOfRovers); i++) {
		const inputPosition = await inputWithValidation(
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

export async function consoleInstructionInputs(rovers: Array<Rover>) {
	let inputAdditionalMoves = "Y";
	if (inputAdditionalMoves === "Y") {
		do {
			for (let i = 0; i < rovers.length; i++) {
				const inputInstructions = await inputWithValidation(
					`Enter instructions to move Rover ${rovers[i].id} (L,R or M):`,
					isValidInstructions,
					"Invalid set of instructions. Must only contain L, R or M"
				);
				const currentPosition = moveRover(rovers[i], inputInstructions);
				console.log(`Rover ${rovers[i].id} current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`);
			}
			inputAdditionalMoves = await input("Would you like to move the Rovers again? Y/N");
		} while (inputAdditionalMoves === "Y");
	}
}