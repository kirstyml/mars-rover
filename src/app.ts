import { clear, print, askQuestion } from './console.js';
import { setPlateau } from './rover/position.js';

// function that starts the mars rover
export function startRover(): void {
    clear();
    print("Mars Rover initiating.......");
    askQuestion("Set Plateau Max coordinate:", setPlateau);
}

// call function
startRover();