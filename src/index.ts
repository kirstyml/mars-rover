import { clear, print, input } from './console.js';


// function that starts the mars rover
export async function startRover() {
    clear();
    print("Mars Rover initiating.......");
    const inputPlateau = await input("Enter the maximum Plateau Coord:");
    const inputPosition = await input("Enter the rover initial position:");
    // 1. create a rover
    // 2. ask for instructions to move
    // 3. return end position
    // 4. want to move again? Y - step 2. N - step 5
    // 5. End readline with message
    console.log(`the input value is: ${inputPlateau}`);
    // getInputs("Enter the maximum Plateau Co-ordinate:", "Enter the rover initial position:", "Enter the set of instructions for the rover:");
}

// call function
startRover();