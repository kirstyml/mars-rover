import { clear, print, input, end } from './console';
import { createRover, moveRover } from './controller';

export async function startRover() {
    clear();
    print("Mars Rover initiating.......");
    const inputPlateau = await input("Enter the maximum Plateau Coord:");
    console.log(inputPlateau);
    const inputPosition = await input("Enter the rover initial position:");
    const rover = createRover(inputPlateau, inputPosition);
    let inputAdditionalMoves = "Y";
    if (inputAdditionalMoves === "Y") {
        do {
            const inputInstructions = await input("Enter instructions to move the rover:");
            const currentPosition = moveRover(rover, inputInstructions);
            console.log(`Rover's current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`);
            inputAdditionalMoves = await input("Would you like to move the Rover again?");
        } while (inputAdditionalMoves === "Y");
    }
    console.log("Rover out");
    end();
}

startRover();