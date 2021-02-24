import { Player } from './objects/Player.js';
import { canvas, ctx, loop as _loop } from './util/canvas.js'
import { background } from './util/drawing-utilities.js'

let player;

async function setup() {
    const { height, width } = canvas;

    player = new Player(90, height - (94 / 2) - 500);

    await player.load();
    
    _loop(loop, 60)
}

function loop() {
    update();
    draw();
}

function update() {
    player.update();
}


function draw() {
    background(0);
    player.draw();
}

window.addEventListener("load", function() {
    setup();
})


