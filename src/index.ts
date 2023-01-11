import { clear, print, getInputs } from './console.js';

// function that starts the mars rover
export function startRover() {
    clear();
    print("Mars Rover initiating.......");
    getInputs("Enter the maximum Plateau Co-ordinate:", "Enter the rover initial position:", "Enter the set of instructions for the rover:");
}

// call function
startRover();