import { clear, print, input, end } from './console';
import { createRover, moveRover } from './controller';

// function that starts the mars rover
export async function startRover() {
    clear();
    print("Mars Rover initiating.......");
    const inputPlateau = await input("Enter the maximum Plateau Coord:");
    const inputPosition = await input("Enter the rover initial position:");
    // 1. create a rover
    const rover = createRover(inputPlateau, inputPosition);
    // 2. ask for instructions to move
    async function userMoveRover() {
        const inputInstructions = await input("Enter instructions to move the rover:");
        const currentPosition = moveRover(rover, inputInstructions);
        // 3. return end position
        console.log(`Rover's current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`);
        const additionalMoves = await input("Would you like to move the Rover again?");
        return additionalMoves;
    }
    let inputAdditionalMoves = await userMoveRover();
    // 4. want to move again? Y - step 2. N - step 5
    if (inputAdditionalMoves === "Y") {
        do {
            inputAdditionalMoves = await userMoveRover();
        } while (inputAdditionalMoves === "Y");
    }
    // 5. End readline with message
    console.log("Rover out");
    end();
}

// call function
startRover();