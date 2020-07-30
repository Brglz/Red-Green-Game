const elem = document.getElementById('myCanvas');

const output = document.querySelector('#output')


export function render(row, col, color, count) {

    function Shape(x, y, color) {
        this.x = x * 50 + 10;
        this.y = y * 25 + ((y + 1) * 25) - 15;
        this.w = 25;
        this.h = 25;
        this.fill = color === 1 ? "#008000" : "#FF0000";
    }

    if (elem.getContext) {

        let myRect = [];

        myRect.push(new Shape(col, row, color));

        const context = elem.getContext('2d');

        for (let i of myRect) {
            context.fillStyle = i.fill;
            context.fillRect(i.x, i.y, i.w, i.h);
        }
    }

    output.classList.remove('hidden')
    output.innerHTML = count + 1;
};

