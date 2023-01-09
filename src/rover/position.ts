interface Coord {
    x: number,
    y: number
};

function inputToCoord(inputCoord : string) : Coord {
    return {
        x: parseInt(inputCoord[0]),
        y: parseInt(inputCoord[2])
    }
};

export function setPlateau(inputCoord: string) : void {
    const plateauCoord = inputToCoord(inputCoord);
    console.log(plateauCoord);
}