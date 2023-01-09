import { clear, print, askQuestion } from './console.js';
import { setPlateau } from './rover/position.js';

// function that starts the mars rover
export function startRover(): void {
    clear();
    print("Mars Rover initiating.......");
    // may need to change question to make user input less open to interpretation
    askQuestion("Set upper right Plateau coordinates:", setPlateau);
}

// call function
startRover();