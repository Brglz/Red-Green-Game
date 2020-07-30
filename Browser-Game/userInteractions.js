import { solveMatrix } from './logic.js'

const inputsObj = {
    width: document.querySelector('#inputX'),
    height: document.querySelector('#inputY'),
    matrix: document.querySelector('#matrix'),
    generations: document.querySelector('#generations'),
    coordinates: document.querySelector('#coordinates'),
};

document.querySelector('#userInput').addEventListener('click', function () {
    for (const line in inputsObj) {
        const cur = inputsObj[line].value;
        try {
            if (cur.length === 0) {
                throw new Error
            }

        } catch (err) {
            alert(`Please fill the ${line}`)
            return
        }

    }
    let asd = new Matrix(inputsObj.width, inputsObj.height, inputsObj.matrix, inputsObj.coordinates, inputsObj.generations)
    solveMatrix(asd.matrix(), asd.x, asd.y, asd.coordinates, asd.generations);
})

function Matrix(x, y, matrix, coordinates, generations) {
    this.x = +x.value;
    this.y = +y.value;
    this.coordinates = coordinates.value.split(',')
    this.generations = +generations.value
    this.matrix = function () {
        let temp;
        temp = (matrix.value.match(new RegExp('.{1,' + this.x + '}', 'g')))
        let result = [];
        for (const line of temp) {
            result.push(line.split(''))
        }
        return result
    }
}