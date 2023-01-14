import { clear, print, input, inputWithValidation, end } from './console';
import { createRover, moveRover, isValidCoord, isValidPosition, isValidInstructions, setPlateau } from './controller';
import { Rover } from './rover';

export async function startRover() {
    clear();
    print("Mars Rover Program initiating.......");
    const inputPlateau = await inputWithValidation(
        "Enter the maximum Plateau Coord (number number):",
        isValidCoord,
        "Incorrect formatting. Please enter coordinate again"
    );
    const plateau = setPlateau(inputPlateau);
    print("Plateau created");
    //TODO add validation?
    const numberOfRovers = await input(
        "How many rovers would you like to land?:"
    );
    const rovers = []
    for (let i = 1; i <= parseInt(numberOfRovers); i++) {
        const inputPosition = await inputWithValidation(
            `Enter the rover ${i} initial position (number number direction):`,
            isValidPosition,
            "Your input is not of the format x y direction"
        );
        const rover = createRover(i, plateau, inputPosition);
        print("Rover created");
        rovers.push(rover);
    }
    console.log(plateau.roverPositions);
    let inputAdditionalMoves = "Y";
    if (inputAdditionalMoves === "Y") {
        do {
            for (let i = 0; i < rovers.length; i++) {
                const inputInstructions = await inputWithValidation(
                    `Enter instructions to move Rover ${rovers[i].id} (L,R or M):`,
                    isValidInstructions,
                    "Invalid set of instructions. Must only contain L, R or M"
                );
                const currentPosition = moveRover(rovers[i], inputInstructions);
                console.log(`Rover ${rovers[i].id} current position: ${currentPosition.x} ${currentPosition.y} ${currentPosition.direction}`);
            }
            inputAdditionalMoves = await input("Would you like to move the Rovers again? Y/N");
        } while (inputAdditionalMoves === "Y");
    }
    console.log("Mission control out");
    end();
}

startRover();