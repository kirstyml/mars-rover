import * as readline from 'node:readline';
import { setPlateau, setInitialPosition, setInstructionSet } from './controller.js';
import { Rover, takeInstructions } from './rover.js';

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

export async function input(textQ : string) : Promise<string> {
	return new Promise ((resolve) => {
		reader.question(textQ, (answer) => resolve(answer));
	});
}

export function end() : void {
	reader.close();
	console.log("Goodbye!")
}

// export function getInputs(plateauQ : string, initialPositionQ : string, instructionsQ : string) {
// 	reader.question(plateauQ, (plateauInput) => {
// 		const plateauCoord = setPlateau(plateauInput);
// 		reader.question(initialPositionQ, (positionInput) => {
// 			const initialPosition = setInitialPosition(positionInput);
// 			const rover = new Rover(plateauCoord, initialPosition);
// 			console.log(rover);
// 			reader.question(instructionsQ, (instructionsInput) => {
// 				const instructionArray = setInstructionSet(instructionsInput);
// 				console.log("End position for Rover:");
// 				// TODO: convert Postion type back to string for diaply
// 				rover.move(instructionArray);
// 				console.log(rover.position);
// 			})
// 		})
// 	});
// }