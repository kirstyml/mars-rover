import { clear, print, end, consolePlateauSetup, consoleRoverNumberSetup, consoleRoverSetup, consoleInstructionInputs } from './console';

export async function startRover() {
    clear();
    print("Mars Rover Program initiating.......");
    const plateau = await consolePlateauSetup()
    print("Plateau created");
    const numberOfRovers = await consoleRoverNumberSetup();
    const rovers = await consoleRoverSetup(numberOfRovers, plateau);
    await consoleInstructionInputs(rovers);
    console.log("Mission control out");
    end();
}

startRover();