import { makeMove, takeInstructions, isValidMove, Rover } from '../rover';
import { Plateau } from '../plateau';

const newPlateau = new Plateau({ x: 5, y: 5 });
const plateauWithRovers = new Plateau({ x: 5, y: 5 });
plateauWithRovers.addRover(new Rover(plateauWithRovers, { x: 1, y: 3, direction: "N"}));

describe("rotates rover", () => {
  it("should rotate 90 degrees to the left", () => {
    expect(makeMove({ x: 1, y: 1, direction: "N" }, newPlateau, "L")).toEqual({ x: 1, y: 1, direction: "W" });
    expect(makeMove({ x: 1, y: 1, direction: "E" }, newPlateau, "L")).toEqual({ x: 1, y: 1, direction: "N" });
    expect(makeMove({ x: 1, y: 1, direction: "S" }, newPlateau, "L")).toEqual({ x: 1, y: 1, direction: "E" });
    expect(makeMove({ x: 1, y: 1, direction: "W" }, newPlateau, "L")).toEqual({ x: 1, y: 1, direction: "S" });
  });
  it("should rotate 90 degrees to the right", () => {
    expect(makeMove({ x: 1, y: 1, direction: "N" }, newPlateau, "R")).toEqual({ x: 1, y: 1, direction: "E" });
    expect(makeMove({ x: 1, y: 1, direction: "E" }, newPlateau, "R")).toEqual({ x: 1, y: 1, direction: "S" });
    expect(makeMove({ x: 1, y: 1, direction: "S" }, newPlateau, "R")).toEqual({ x: 1, y: 1, direction: "W" });
    expect(makeMove({ x: 1, y: 1, direction: "W" }, newPlateau, "R")).toEqual({ x: 1, y: 1, direction: "N" });
  });
});

describe("can tell if move is valid", () => {
  it("should return true if move is in plateau", () => {
    expect(isValidMove({ x: 1, y: 1, direction: "N" }, newPlateau)).toBe(true);
    expect(isValidMove({ x: 5, y: 5, direction: "N" }, newPlateau)).toBe(true);
    expect(isValidMove({ x: 0, y: 0, direction: "N" }, newPlateau)).toBe(true);
  });
  it("should return false if move is in plateau", () => {
    expect(isValidMove({ x: 1, y: 6, direction: "N" }, newPlateau)).toBe(false);
    expect(isValidMove({ x: -5, y: 5, direction: "N" }, newPlateau)).toBe(false);
  });
  it("should return false if move is into a Rover", () => {
    expect(isValidMove({ x: 1, y: 3, direction: "N" }, plateauWithRovers)).toBe(false);
  });
});

describe("moves rover forward", () => {
  it("should move the rover in the direction it is facing", () => {
    expect(makeMove({ x: 1, y: 1, direction: "N" }, newPlateau, "M")).toEqual({ x: 1, y: 2, direction: "N" });
    expect(makeMove({ x: 1, y: 1, direction: "E" }, newPlateau, "M")).toEqual({ x: 2, y: 1, direction: "E" });
    expect(makeMove({ x: 1, y: 1, direction: "S" }, newPlateau, "M")).toEqual({ x: 1, y: 0, direction: "S" });
    expect(makeMove({ x: 1, y: 1, direction: "W" }, newPlateau, "M")).toEqual({ x: 0, y: 1, direction: "W" });
  });
});

describe("does not move rover if next move is off the plateau", () => {
  it("should return the initial position", () => {
    expect(makeMove({ x: 5, y: 5, direction: "N" }, newPlateau, "M")).toEqual({ x: 5, y: 5, direction: "N" });
  });
});

describe("does not move rover if next move is off the plateau", () => {
  it("should return the initial position", () => {
    expect(takeInstructions({ x: 1, y: 2, direction: "N" }, newPlateau, ["L", "M", "L", "M", "L", "M", "L", "M", "M"])).toEqual({ x: 1, y: 3, direction: "N" });
    expect(takeInstructions({ x: 3, y: 3, direction: "E" }, newPlateau, ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"])).toEqual({ x: 5, y: 1, direction: "E" });
  });
});

// describe("does not move rover if there is another rover", () => {
//   it("should return the initial position", () => {
//     expect(makeMove({ x: 1, y: 2, direction: "N" }, plateauWithRovers, "M")).toEqual({ x: 1, y: 2, direction: "N" });
//   });
// });