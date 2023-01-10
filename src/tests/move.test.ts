import { moveRover, takeInstructions } from '../rover/move';

describe("rotates rover", () => {
    it("should rotate 90 degrees to the left", () => {
      expect(moveRover({ x: 1, y: 1, direction: "N"}, { x: 5, y: 5}, "L")).toEqual({ x: 1, y: 1, direction: "W"});
      expect(moveRover({ x: 1, y: 1, direction: "E"}, { x: 5, y: 5}, "L")).toEqual({ x: 1, y: 1, direction: "N"});
      expect(moveRover({ x: 1, y: 1, direction: "S"}, { x: 5, y: 5}, "L")).toEqual({ x: 1, y: 1, direction: "E"});
      expect(moveRover({ x: 1, y: 1, direction: "W"}, { x: 5, y: 5}, "L")).toEqual({ x: 1, y: 1, direction: "S"});
    });
    it("should rotate 90 degrees to the right", () => {
      expect(moveRover({ x: 1, y: 1, direction: "N"}, { x: 5, y: 5}, "R")).toEqual({ x: 1, y: 1, direction: "E"});
      expect(moveRover({ x: 1, y: 1, direction: "E"}, { x: 5, y: 5}, "R")).toEqual({ x: 1, y: 1, direction: "S"});
      expect(moveRover({ x: 1, y: 1, direction: "S"}, { x: 5, y: 5}, "R")).toEqual({ x: 1, y: 1, direction: "W"});
      expect(moveRover({ x: 1, y: 1, direction: "W"}, { x: 5, y: 5}, "R")).toEqual({ x: 1, y: 1, direction: "N"});
    });
  });

  describe("moves rover forward", () => {
    it("should move the rover in the direction it is facing", () => {
      expect(moveRover({ x: 1, y: 1, direction: "N"}, { x: 5, y: 5}, "M")).toEqual({ x: 1, y: 2, direction: "N"});
      expect(moveRover({ x: 1, y: 1, direction: "E"}, { x: 5, y: 5}, "M")).toEqual({ x: 2, y: 1, direction: "E"});
      expect(moveRover({ x: 1, y: 1, direction: "S"}, { x: 5, y: 5}, "M")).toEqual({ x: 1, y: 0, direction: "S"});
      expect(moveRover({ x: 1, y: 1, direction: "W"}, { x: 5, y: 5}, "M")).toEqual({ x: 0, y: 1, direction: "W"});
    });
  });

  describe("does not move rover if next move is off the plateau", () => {
    it("should return the initial position", () => {
      expect(moveRover({ x: 5, y: 5, direction: "N"}, { x: 5, y: 5}, "M")).toEqual({ x: 5, y: 5, direction: "N"});
    });
  });

  describe("does not move rover if next move is off the plateau", () => {
    it("should return the initial position", () => {
      expect(takeInstructions({ x: 1, y: 2, direction: "N"}, { x: 5, y: 5}, ["L","M","L","M","L","M","L","M","M"])).toEqual({ x: 1, y: 3, direction: "N"});
    });
  });