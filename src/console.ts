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

// this function allows us to prompt the user with a question, and call a callback function with whatever string has been input
export function askQuestion(question: string, callback: (arg: string) => void) {
	reader.question(question, callback);
}