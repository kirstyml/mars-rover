import { Rover } from '../rover';
import { Plateau } from '../plateau';
import { Mission } from '../mission';

describe("rotates rover", () => {
  it("should rotate 90 degrees to the left", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover = new Rover(1, { x: 1, y: 1, direction: "N" });
    const newMission = new Mission(newPlateau, [newRover]);
    newMission.moveRover(["L"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "W" });
    newMission.moveRover(["L"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "S" });
    newMission.moveRover(["L"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "E" });
    newMission.moveRover(["L"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "N" });
  });
  it("should rotate 90 degrees to the right", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover = new Rover(1, { x: 1, y: 1, direction: "N" });
    const newMission = new Mission(newPlateau, [newRover]);
    newMission.moveRover(["R"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "E" });
    newMission.moveRover(["R"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "S" });
    newMission.moveRover(["R"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "W" });
    newMission.moveRover(["R"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "N" });
  });
});

describe("moves rover forward", () => {
  it("should move the rover in the direction it is facing", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover = new Rover(1, { x: 1, y: 1, direction: "N" });
    const newMission = new Mission(newPlateau, [newRover]);
    newMission.moveRover(["M"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 2, direction: "N" });
    newMission.moveRover(["R", "M"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 2, y: 2, direction: "E" });
    newMission.moveRover(["R", "M"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 2, y: 1, direction: "S" });
    newMission.moveRover(["R", "M"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 1, direction: "W" });
  });
});

describe("does not move rover if next move is off the plateau", () => {
  it("should return the initial position", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover = new Rover(1, { x: 5, y: 5, direction: "N" });
    const newMission = new Mission(newPlateau, [newRover]);
    newMission.moveRover(["M"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 5, y: 5, direction: "N" });
  });
});

describe("takes an array of instructions and moves the rover in that order", () => {
  it("should return the correct position", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover1 = new Rover(1, { x: 1, y: 2, direction: "N" });
    const newRover2 = new Rover(2, { x: 3, y: 3, direction: "E" });
    const newMission = new Mission(newPlateau, [newRover1, newRover2]);
    newMission.moveRover(["L", "M", "L", "M", "L", "M", "L", "M", "M"], 1);
    newMission.moveRover(["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"], 2);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 3, direction: "N" });
    expect(newMission.rovers[1].position).toEqual({ x: 5, y: 1, direction: "E" });
  });
});

describe("does not move rover if there is another rover", () => {
  it("should return the initial position", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover1 = new Rover(1, { x: 1, y: 2, direction: "N" });
    const newRover2 = new Rover(2, { x: 1, y: 3, direction: "E" });
    const newMission = new Mission(newPlateau, [newRover1, newRover2]);
    newMission.moveRover(["M"], 1);
    expect(newMission.rovers[0].position).toEqual({ x: 1, y: 2, direction: "N" });
  });
});

describe("should not create a rover if the initial position is not valid", () => {
  it("should throw an error if a rover is already there", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover1 = new Rover(1, { x: 1, y: 2, direction: "N" });
    const newMission = new Mission(newPlateau, [newRover1]);
    expect(() => {
      newMission.createRover(2,{ x: 1, y: 2, direction: "E" })
    }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
  });
  it("should throw an error if position is not on the Plateau", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    const newRover1 = new Rover(1, { x: 1, y: 2, direction: "N" });
    const newMission = new Mission(newPlateau, [newRover1]);
    expect(() => {
      newMission.createRover(2,{ x: -1, y: 2, direction: "N" })
    }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
    expect(() => {
      newMission.createRover(2,{ x: 1, y: 6, direction: "N" })
    }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
  });
});