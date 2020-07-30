function solveMatrix(matrix, x, y, coordinates, generations) {

    const [coordinatesX, coordinatesY] = coordinates;

    let currentGeneration = JSON.parse(JSON.stringify(matrix));

    let count = 0;

    (function validatePoint() {
        if (x <= coordinatesX || x < 0) {
            throw new Error('Wrong x coordinates')
        }
        if (y < coordinatesY || y < 0) {
            throw new Error('Wrong y coordinates')
        }
    })()

    for (let i = 0; i <= generations; i++) {
        let newGeneration = [];

        for (let row = 0; row < y; row++) {
            let temp = [];

            for (let col = 0; col < x; col++) {
                let current = +currentGeneration[row][col];
                let green = 0;

                let neighbors = {
                    topLeft: null,
                    topMid: null,
                    topRight: null,
                    midLeft: null,
                    midRight: null,
                    botLeft: null,
                    botMid: null,
                    botRight: null,
                }

                if (row === 0) {
                    neighbors.midLeft = currentGeneration[row][col - 1];
                    neighbors.midRight = currentGeneration[row][col + 1];
                    neighbors.botLeft = currentGeneration[row + 1][col - 1];
                    neighbors.botMid = currentGeneration[row + 1][col];
                    neighbors.botRight = currentGeneration[row + 1][col + 1];
                } else if (row === y - 1) {
                    neighbors.topLeft = currentGeneration[row - 1][col - 1];
                    neighbors.topMid = currentGeneration[row - 1][col];
                    neighbors.topRight = currentGeneration[row - 1][col + 1];
                    neighbors.midLeft = currentGeneration[row][col - 1];
                    neighbors.midRight = currentGeneration[row][col + 1];
                } else {
                    neighbors.topLeft = currentGeneration[row - 1][col - 1];
                    neighbors.topMid = currentGeneration[row - 1][col];
                    neighbors.topRight = currentGeneration[row - 1][col + 1];
                    neighbors.midLeft = currentGeneration[row][col - 1];
                    neighbors.midRight = currentGeneration[row][col + 1];
                    neighbors.botLeft = currentGeneration[row + 1][col - 1];
                    neighbors.botMid = currentGeneration[row + 1][col];
                    neighbors.botRight = currentGeneration[row + 1][col + 1];
                }

                for (const line in neighbors) {
                    if (neighbors[line] > -1 && neighbors[line] !== null) {
                        if (neighbors[line] == 1) {
                            green++
                        }

                    }
                }

                if (current === 0) { //red = 0
                    if (redToGreen(green)) {
                        temp.push(1);
                    } else {
                        temp.push(0)
                    }
                }
                else if (current === 1) { //green = 1
                    if (greenToRed(green)) {
                        temp.push(0)
                    } else {
                        temp.push(1)
                    }
                }

            } //end of small loop

            newGeneration.push(temp)

        } // end of big loop

        if (currentGeneration[coordinatesX][coordinatesY] === 1) {
            count++
        }

        console.log(currentGeneration);

        currentGeneration = JSON.parse(JSON.stringify(newGeneration));
        console.log(`=================End of generation${i}`);
    } // end of generation

    console.log(count);
}


function redToGreen(greenCount) {
    //if red cell is surrounded by exactly 3 or 6 green cells becomes green;
    //if red cell is surrounded by 0,1,2,4,5,7,8 green cells stays red;
    if (greenCount === 3 || greenCount === 6) {
        return true;
    } else {
        return false;
    }

}

function greenToRed(greenCount) {
    //if green cell is surrounded by 0,1,4,5,7,8 green cells becomes red;
    //if green cell is surrounded by 2,3,6 green cells stays green

    if (greenCount !== 2) {
        if (greenCount !== 3) {
            if (greenCount !== 6) {
                return true
            }
        }
    } else {
        return false
    }

}

solveMatrix([['0', '0', '0', '0'], ['1', '1', '1', '1'], ['1', '1', '1', '1']], 4, 3, [2, 3], 5); // My Test Input 1
console.log(`------`);

solveMatrix([['0', '0', '0'], ['1', '1', '1'], ['0', '0', '0']], 3, 3, [1, 0], 10); // Test Input 1

console.log(`------`);
solveMatrix([['1', '0', '0', '1'], ['1', '1', '1', '1'], ['0', '1', '0', '0'], ['1', '0', '1', '0']], 4, 4, [2, 2], 15); // Test Input 2