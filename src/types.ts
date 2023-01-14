export interface Coord {
    x: number,
    y: number
}

export const directions = ["N", "E", "S", "W"] as const;
export type DirectionType = typeof directions[number];

export interface Position {
    x: number,
    y: number,
    direction: DirectionType
}

export const instructions = ["L", "R", "M"] as const;
export type InstructionType = "L" | "R" | "M";

export interface RoverRef {
    id: number,
    position: Position
}