import { greeting, EmptyBox } from '../models/EmptyBox.js'

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const canvas = document.getElementById('sketch');
const ctx = canvas.getContext("2d");

const height = canvas.height;
const width = canvas.width;

const keyboard = Keyboard.getInstance()

const clear = () =>  {
    ctx.clearRect(-canvas.width,-canvas.height, canvas.width * 4, canvas.height * 4)
}

// setInterval(() => {
//     keyboard.check(keydown);
//     draw();
// }, 16)

let x;
let y;

let ticks = 0;
let fps = 0;

let box;

let lastTime;
const requiredElapsed=1000 / 15;

function setup() {
    box = new EmptyBox(200, 200);

    requestAnimationFrame(draw);
    setInterval(_fps, 1000)

    greeting();
    x = 0;
    y = 0;
}

function _fps() {
    fps = ticks;
    ticks = 0;
}


function draw(now) {
    requestAnimationFrame(draw);

    if(!lastTime) {
        lastTime = now;
    }

    const elapsed = now - lastTime;

    if (elapsed > requiredElapsed) {
        ctx.background("#00FF00");

        ctx.fillStyle = "black";
        ctx.fillText("FPS: " + fps, 50, 50);

        ctx.fillStyle = "#FFFF00"
        ctx.fillTriangle(x, y, x - 20, y + 20, x + 20, y + 20);
        
        x = (x + 1) % width;
        y = (y + 1) % height;

        ticks++;

        lastTime = now;
    }
    
}

window.onload = function() {
    setup();
}

