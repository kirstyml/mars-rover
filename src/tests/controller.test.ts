import { inputToCoord, setPlateauCoord, isValidCoord, isValidPosition, inputToPosition, setInitialPosition } from '../controller';

describe("inputToCoord takes a string and returns a valid Coord", () => {
    it("should return a Coord type from a valid string", () => {
        expect(inputToCoord("1 2")).toEqual({ x: 1, y: 2 });
    });
});

describe("isValidCoord takes a string and true if it is a valid coord", () => {
    it("should return a true from a valid string", () => {
        expect(isValidCoord("1 2")).toBe(true);
        expect(isValidCoord("111 222")).toBe(true);
    });
    it("should return false from an invalid string", () => {
        expect(isValidCoord("1")).toBe(false);
        expect(isValidCoord("12")).toBe(false);
        expect(isValidCoord("1 F")).toBe(false);
        expect(isValidCoord("1,2")).toBe(false);
        expect(isValidCoord("100 2FF")).toBe(false);
    });
});

describe("setPlateau validates the user input coord and returns the Plateau coord", () => {
    it("should return a Coord type from a string: digit space digit", () => {
        expect(setPlateauCoord("1 2")).toEqual({ x: 1, y: 2 });
        expect(setPlateauCoord("111 222")).toEqual({ x: 111, y: 222 });
    });
    it("should throw an error if the user input contains a letter", () => {
        expect(() => {
            setPlateauCoord("1 F")
        }).toThrow();
    });
    it("should throw an error if the user input digits are not separated by a space", () => {
        expect(() => {
            setPlateauCoord("12")
        }).toThrow();
    });
});

describe("isValidPosition takes a string and true if it is a valid position", () => {
    it("should return a true from a valid string", () => {
        expect(isValidPosition("1 2 N")).toBe(true);
        expect(isValidPosition("111 222 E")).toBe(true);
    });
    it("should return false from an invalid string", () => {
        expect(isValidPosition("1")).toBe(false);
        expect(isValidPosition("12")).toBe(false);
        expect(isValidPosition("1 F")).toBe(false);
        expect(isValidPosition("1,2")).toBe(false);
        expect(isValidPosition("12E")).toBe(false);
        expect(isValidPosition("1,2,E")).toBe(false);
        expect(isValidPosition("1 2 F")).toBe(false);
    });
});

describe("inputToPosition takes a string and returns a valid Position", () => {
    it("should return a Position type from a valid string", () => {
        expect(inputToPosition("1 2 N")).toEqual({ x: 1, y: 2, direction: "N" });
    });
});

describe("setInitialPosition validates the user input position and returns the InitialPosition", () => {
    it("should return a position type from a string: digit space digit", () => {
        expect(setInitialPosition("1 2 N")).toEqual({ x: 1, y: 2, direction: "N" });
        expect(setInitialPosition("111 222 E")).toEqual({ x: 111, y: 222, direction: "E"});
    });
    it("should throw an error if the user input is the wrong format", () => {
        expect(() => {
            setInitialPosition("1 F")
        }).toThrow();
    });
});
