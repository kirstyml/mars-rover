import { RoverConsole } from './console';
import * as readline from 'node:readline';
import { clear, print } from './console_helpers';

export async function startRover(roverUI: RoverConsole) {
    clear();
    print("Mars Rover Program initiating.......");
    const plateau = await roverUI.promptForPlateauSize()
    print("Plateau created");
    const numberOfRovers = await roverUI.promptForNumberOfRovers();
    const rovers = await roverUI.promptForRoverLandingPositions(numberOfRovers, plateau);
    await roverUI.promptForRoverMoveInstructions(rovers);
    print("Mission control out");
    roverUI.end();
}

const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const ui = new RoverConsole(reader);

startRover(ui);