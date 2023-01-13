import { Rover } from '../rover';
import { Plateau } from '../plateau';

const newPlateau = new Plateau({ x: 5, y: 5 });
const roversPlateau = new Plateau({ x: 5, y: 5});
const rover1 = new Rover(roversPlateau, { x: 1, y: 2, direction: "N"});
roversPlateau.addRover(rover1);

describe("Plateau should be able to add rovers", () => {
    it("should have no rovers on creation", () => {
        expect(newPlateau.rovers).toEqual([]);
    });
    it("addRovers should add the rover", () => {
        expect(roversPlateau.rovers).toEqual([rover1]);
    });
});

describe("Plateau should return positions of the rovers", () => {
    it("should return an empty array for a new plateau", () => {
        expect(newPlateau.getRoverPositions()).toEqual([]);
    });
    it("should return an empty array for a new plateau", () => {
        expect(roversPlateau.getRoverPositions()).toEqual([{ x: 1, y: 2, direction: "N"}]);
    });
});