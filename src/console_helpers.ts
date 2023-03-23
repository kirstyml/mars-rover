import * as readline from 'node:readline';

export function print(str: string): void {
	console.log(str);
	console.log();
}

export function clear(): void {
	console.clear();
	print('------------------------------------');
}

export async function input(reader: readline.Interface, textQ: string): Promise<string> {
    return new Promise((resolve) => {
        reader.question(textQ, (answer) => resolve(answer));
    });
}

export async function inputWithValidation(reader: readline.Interface, questionText: string, inputIsValid: (arg: string) => boolean, errorText: string) {
    let userInput = await input(reader, questionText);
    if (!inputIsValid(userInput)) {
        console.log(errorText);
        userInput = await inputWithValidation(reader, questionText, inputIsValid, errorText);
    }
    return Promise.resolve(userInput);
}