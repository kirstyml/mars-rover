import * as readline from 'node:readline';

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