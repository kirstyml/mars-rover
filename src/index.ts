import { clear, print, input, inputWithValidation, end } from './console';
import { createRover, moveRover, isValidCoord, isValidPosition, isValidInstructions, setPlateau } from './controller';

export async function startRover() {
    clear();
    print("Mars Rover initiating.......");
    const inputPlateau = await inputWithValidation(
        "Enter the maximum Plateau Coord (number number):", 
        isValidCoord, 
        "Incorrect formatting. Please enter coordinate again"
    );
    const plateau = setPlateau(inputPlateau);
    const inputPosition = await inputWithValidation(
        "Enter the rover initial position (number number direction):",
        isValidPosition,
        "Your input is not of the format x y direction"
    );
    const rover = createRover(plateau, inputPosition);
    let inputAdditionalMoves = "Y";
    if (inputAdditionalMoves === "Y") {
        do {
            const inputInstructions = await inputWithValidation(
                "Enter instructions to move the rover (L,R or M):",
                isValidInstructions,
                "Invalid set of instructions. Must only contain L, R or M"
                );
            const currentPosition = moveRover(rover, inputInstructions);
            console.log(`Rover's current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`);
            inputAdditionalMoves = await input("Would you like to move the Rover again? Y/N");
        } while (inputAdditionalMoves === "Y");
    }
    console.log("Mission control out");
    end();
}

startRover();