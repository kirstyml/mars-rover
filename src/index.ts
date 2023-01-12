import { clear, print, input } from './console';
import { createRover, moveRover } from './controller';

// function that starts the mars rover
export async function startRover() {
    clear();
    print("Mars Rover initiating.......");
    const inputPlateau = await input("Enter the maximum Plateau Coord:");
    const inputPosition = await input("Enter the rover initial position:");
    // 1. create a rover
    const rover = createRover(inputPlateau, inputPosition);
    console.log(rover);
    // 2. ask for instructions to move
    const inputInstructions = await input("Enter instructions to move the rover:");
    
    // 3. return end position
    // 4. want to move again? Y - step 2. N - step 5
    // 5. End readline with message
    // getInputs("Enter the maximum Plateau Co-ordinate:", "Enter the rover initial position:", "Enter the set of instructions for the rover:");
}

// call function
startRover();