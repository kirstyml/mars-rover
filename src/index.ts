import { RoverConsole } from "./console";
import * as readline from "node:readline";
import { clear, print } from "./console_helpers";
import { Mission } from "./mission";

export async function startRover(roverUI: RoverConsole) {
  clear();
  print("Mars Rover Program initiating.......");
  const mission = new Mission();
  await roverUI.promptForPlateauSize(mission);
  print("Plateau created");
  const numberOfRovers = await roverUI.promptForNumberOfRovers();
  await roverUI.promptForRoverLandingPositions(numberOfRovers, mission);
  await roverUI.promptForRoverMoveInstructions(mission);
  print("Mission control out");
  roverUI.end();
}

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ui = new RoverConsole(reader);

startRover(ui);
