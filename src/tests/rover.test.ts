import { makeMove, takeInstructions, isValidMove, Rover } from '../rover';
import { Plateau } from '../plateau';

const newPlateau = new Plateau({ x: 5, y: 5 });
const plateauWithRovers = new Plateau({ x: 5, y: 5 });
plateauWithRovers.addRover(new Rover(1, plateauWithRovers, { x: 1, y: 3, direction: "N" }));
plateauWithRovers.addRover(new Rover(2, plateauWithRovers, { x: 5, y: 4, direction: "N" }));

describe("rotates rover", () => {
  it("should rotate 90 degrees to the left", () => {
    expect(makeMove({ x: 1, y: 1, direction: "N" }, newPlateau, "L", 1)).toEqual({ x: 1, y: 1, direction: "W" });
    expect(makeMove({ x: 1, y: 1, direction: "E" }, newPlateau, "L", 1)).toEqual({ x: 1, y: 1, direction: "N" });
    expect(makeMove({ x: 1, y: 1, direction: "S" }, newPlateau, "L", 1)).toEqual({ x: 1, y: 1, direction: "E" });
    expect(makeMove({ x: 1, y: 1, direction: "W" }, newPlateau, "L", 1)).toEqual({ x: 1, y: 1, direction: "S" });
  });
  it("should rotate 90 degrees to the right", () => {
    expect(makeMove({ x: 1, y: 1, direction: "N" }, newPlateau, "R", 1)).toEqual({ x: 1, y: 1, direction: "E" });
    expect(makeMove({ x: 1, y: 1, direction: "E" }, newPlateau, "R", 1)).toEqual({ x: 1, y: 1, direction: "S" });
    expect(makeMove({ x: 1, y: 1, direction: "S" }, newPlateau, "R", 1)).toEqual({ x: 1, y: 1, direction: "W" });
    expect(makeMove({ x: 1, y: 1, direction: "W" }, newPlateau, "R", 1)).toEqual({ x: 1, y: 1, direction: "N" });
  });
});

describe("can tell if move is valid", () => {
  it("should return true if move is in plateau", () => {
    expect(isValidMove({ x: 1, y: 1, direction: "N" }, newPlateau, 1)).toBe(true);
    expect(isValidMove({ x: 5, y: 5, direction: "N" }, newPlateau, 1)).toBe(true);
    expect(isValidMove({ x: 0, y: 0, direction: "N" }, newPlateau, 1)).toBe(true);
  });
  it("should return false if move is in plateau", () => {
    expect(isValidMove({ x: 1, y: 6, direction: "N" }, newPlateau, 1)).toBe(false);
    expect(isValidMove({ x: -5, y: 5, direction: "N" }, newPlateau, 1)).toBe(false);
  });
  it("should return false if move is into a Rover", () => {
    expect(isValidMove({ x: 1, y: 3, direction: "N" }, plateauWithRovers, 2)).toBe(false);
  });
});

describe("moves rover forward", () => {
  it("should move the rover in the direction it is facing", () => {
    expect(makeMove({ x: 1, y: 1, direction: "N" }, newPlateau, "M", 1)).toEqual({ x: 1, y: 2, direction: "N" });
    expect(makeMove({ x: 1, y: 1, direction: "E" }, newPlateau, "M", 1)).toEqual({ x: 2, y: 1, direction: "E" });
    expect(makeMove({ x: 1, y: 1, direction: "S" }, newPlateau, "M", 1)).toEqual({ x: 1, y: 0, direction: "S" });
    expect(makeMove({ x: 1, y: 1, direction: "W" }, newPlateau, "M", 1)).toEqual({ x: 0, y: 1, direction: "W" });
  });
});

describe("does not move rover if next move is off the plateau", () => {
  it("should return the initial position", () => {
    expect(makeMove({ x: 5, y: 5, direction: "N" }, newPlateau, "M", 1)).toEqual({ x: 5, y: 5, direction: "N" });
  });
});

describe("does not move rover if next move is off the plateau", () => {
  it("should return the initial position", () => {
    expect(takeInstructions({ x: 1, y: 2, direction: "N" }, newPlateau, ["L", "M", "L", "M", "L", "M", "L", "M", "M"], 1)).toEqual({ x: 1, y: 3, direction: "N" });
    expect(takeInstructions({ x: 3, y: 3, direction: "E" }, newPlateau, ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"], 1)).toEqual({ x: 5, y: 1, direction: "E" });
  });
});

describe("does not move rover if there is another rover", () => {
  it("should return the initial position", () => {
    expect(makeMove({ x: 1, y: 2, direction: "N" }, plateauWithRovers, "M", 2)).toEqual({ x: 1, y: 2, direction: "N" });
  });
});

describe("should not create a rover if the initial position is not valid", () => {
  it("should throw an error if a rover is already there", () => {
    expect(() => {
      new Rover(2, plateauWithRovers, { x: 1, y: 3, direction: "N" })
    }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
  });
  it("should throw an error if position is not on the Plateau", () => {
    expect(() => {
      new Rover(2, plateauWithRovers, { x: -1, y: 2, direction: "N" })
    }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
    expect(() => {
      new Rover(2, plateauWithRovers, { x: 1, y: 6, direction: "N" })
    }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
  });
});