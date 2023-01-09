interface Coord {
    x: number,
    y: number
};

export function isValidCoord(inputCoord : string) : Boolean {
    // true if fits pattern of number space number
    // split by space should give an array of length 2
    // each string should be only digits
    const coordArray = inputCoord.split(" ");
    return coordArray.length === 2 && coordArray.every(item => /d+/g.test(item));
}

function inputToCoord(inputCoord : string) : Coord {
    return {
        x: parseInt(inputCoord[0]),
        y: parseInt(inputCoord[2])
    }
};

export function setPlateau(inputCoord: string) : void {
    if (isValidCoord(inputCoord)) {
        const plateauCoord = inputToCoord(inputCoord);
        console.log(plateauCoord);
    }
    else throw new Error("Not a valid coordinate. Must be number space number");
}
