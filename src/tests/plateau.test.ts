import { Plateau } from '../plateau';

describe("Plateau should be created with 4 co-ords", () => {
    const newPlateau = new Plateau({ x: 5, y: 5 });
    it("should have maxX", () => {
        expect(newPlateau.maxX).toEqual(5);
    });
    it("should have minX", () => {
        expect(newPlateau.minX).toEqual(0);
    });
    it("should have maxY", () => {
        expect(newPlateau.maxY).toEqual(5);
    });
    it("should have minY", () => {
        expect(newPlateau.minY).toEqual(0);
    });
});