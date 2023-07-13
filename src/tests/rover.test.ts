import { Rover } from '../rover';

describe("creates rover with position and id", () => {
  it("should have a position", () => {
    expect(new Rover(1, { x: 5, y: 5, direction: "N"}).position).toEqual({ x: 5, y: 5, direction: "N"});
  });
  it("should have an id", () => {
    expect(new Rover(1, { x: 5, y: 5, direction: "N"}).id).toEqual(1);
  });
})


// describe("does not move rover if next move is off the plateau", () => {
//   it("should return the initial position", () => {
//     expect(makeMove({ x: 5, y: 5, direction: "N" }, newPlateau, "M", 1)).toEqual({ x: 5, y: 5, direction: "N" });
//   });
// });


// describe("should not create a rover if the initial position is not valid", () => {
//   it("should throw an error if a rover is already there", () => {
//     expect(() => {
//       new Rover(2, plateauWithRovers, { x: 1, y: 3, direction: "N" })
//     }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
//   });
//   it("should throw an error if position is not on the Plateau", () => {
//     expect(() => {
//       new Rover(2, plateauWithRovers, { x: -1, y: 2, direction: "N" })
//     }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
//     expect(() => {
//       new Rover(2, plateauWithRovers, { x: 1, y: 6, direction: "N" })
//     }).toThrow("Rover's initial position is invalid. Cannot land outside of the plateau or on another rover");
//   });
// });