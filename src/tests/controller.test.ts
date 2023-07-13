import {
    inputToCoord,
    setPlateau,
    isValidCoord,
    isValidPosition,
    inputToPosition,
    setInitialPosition,
    isValidInstructions,
    setInstructionSet
} from '../controller';
import { Mission } from '../mission';
import { Plateau } from '../plateau';

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
        expect(isValidCoord("")).toBe(false);
    });
});

describe("setPlateau validates the user input coord and returns the Plateau coord", () => {
    it("should return a Coord type from a string: digit space digit", () => {
        expect(setPlateau("1 2", new Mission)).toEqual(new Plateau({ x: 1, y: 2 }));
        expect(setPlateau("111 222", new Mission)).toEqual(new Plateau({ x: 111, y: 222 }));
    });
    it("should throw an error if the user input contains a letter", () => {
        expect(() => {
            setPlateau("1 F", new Mission)
        }).toThrow();
    });
    it("should throw an error if the user input digits are not separated by a space", () => {
        expect(() => {
            setPlateau("12", new Mission)
        }).toThrow();
    });
    it("should throw an error if the user input is empty", () => {
        expect(() => {
            setPlateau("", new Mission)
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
        expect(isValidPosition("")).toBe(false);
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
        expect(setInitialPosition("111 222 E")).toEqual({ x: 111, y: 222, direction: "E" });
    });
    it("should throw an error if the user input is the wrong format", () => {
        expect(() => {
            setInitialPosition("1 F")
        }).toThrow();
        expect(() => {
            setInitialPosition("")
        }).toThrow();
    });
});

describe("isValidInstruction takes a string and true if it is a valid position", () => {
    it("should return a true from a valid string", () => {
        expect(isValidInstructions("LRM")).toBe(true);
        expect(isValidInstructions("M")).toBe(true);
    });
    it("should return false from an invalid string", () => {
        expect(isValidInstructions("1")).toBe(false);
        expect(isValidInstructions("Left")).toBe(false);
        expect(isValidInstructions("")).toBe(false);
    });
});

describe("setInstructionSet should return a valid array of instructions", () => {
    it("should return a position type from a string: digit space digit", () => {
        expect(setInstructionSet("LMLMLM")).toEqual(["L", "M", "L", "M", "L", "M"]);
        expect(setInstructionSet("R")).toEqual(["R"]);
    });
    it("should throw an error if the user input is the wrong format", () => {
        expect(() => {
            setInstructionSet("1 F")
        }).toThrow();
        expect(() => {
            setInstructionSet("")
        }).toThrow();
    });
});
