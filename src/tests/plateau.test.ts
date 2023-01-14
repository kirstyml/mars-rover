import { Rover } from '../rover';
import { Plateau } from '../plateau';

describe("Plateau should add rovers when asked", () => {
    it("should have no rovers on creation", () => {
        const newPlateau = new Plateau({ x: 5, y: 5 });
        expect(newPlateau.roverPositions).toEqual([]);
    });
    it("addRovers should add the rover", () => {
        const newPlateau = new Plateau({ x: 5, y: 5 });
        console.log(newPlateau);
        const newRover = new Rover(1, newPlateau, { x: 1, y: 2, direction: "N"});
        expect(newPlateau.roverPositions).toEqual([{id: 1, position: newRover.position}]);
    });
});

describe("Plateau should return positions of the rovers", () => {
    it("should return an empty array for a new plateau", () => {
        const newPlateau = new Plateau({ x: 5, y: 5 });
        expect(newPlateau.roverPositions).toEqual([]);
    });
    it("should return the rover positions", () => {
        const roversPlateau = new Plateau({ x: 5, y: 5}, [{id: 1, position: { x: 1, y: 2, direction: "N"}}]);
        expect(roversPlateau.getRoverPositions()).toEqual([{ x: 1, y: 2, direction: "N"}]);
    });
});

// test that the rover method updates the plateau
describe("Plateau should update with Rovers new position", () => {
    it("updateInstructions should update the Plateau", () => {
        const roversPlateau = new Plateau({ x: 5, y: 5}, [{id: 1, position: { x: 1, y: 2, direction: "N"}}]);
        roversPlateau.updatePositions({id: 1, position: { x: 1, y: 4, direction: "N"}})
        expect(roversPlateau.roverPositions).toEqual([{id: 1, position: { x: 1, y: 4, direction: "N"}}])
    });
    it("updateInstructions should not update the plateau if the rover cannot be found", () => {
        const roversPlateau = new Plateau({ x: 5, y: 5}, [{id: 1, position: { x: 1, y: 2, direction: "N"}}]);
        roversPlateau.updatePositions({id: 3, position: { x: 1, y: 4, direction: "N"}});
        expect(roversPlateau.roverPositions).toEqual([{id: 1, position: { x: 1, y: 2, direction: "N"}}])
    });
    it("return the updated position after a rover has moved", () => {
        const newPlateau = new Plateau({ x: 5, y: 5 });
        const newRover = new Rover(1, newPlateau, { x: 1, y: 2, direction: "N"});
        newRover.move(["M"])
        expect(newPlateau.getRoverPositions()).toEqual([{ x: 1, y: 3, direction: "N"}]);
    });
});
