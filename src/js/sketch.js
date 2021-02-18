const canvas = document.getElementById('sketch');
const ctx = canvas.getContext("2d");

const clack = new Howl({
    src: '/sounds/clack.wav',
    volume: 0.15
});

const inflate = new Howl({
    src: '/sounds/inflate.mp3',
    volume: 0.15
})

const pop = new Howl({
    src: '/sounds/pop.mp3',
    volume: 0.15
})

window.onload = setup;

let width;
let height;

let clocks;
let fakeClock;
let ground;

let engine;
let world;

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    width = canvas.width;
    height = canvas.height;

    engine = Engine.create();
    world = engine.world;

    fakeClock = new FakeClock(width / 2, height / 2, 100, ctx)

    clocks = []
    ground = new Ground();

    Engine.run(engine);

    Events.on(engine, 'collisionStart', (e) => {

    })


    setInterval(() => {
        draw();
    }, 16)
}

function draw() {
    // ctx.background(0);
    // ctx.fillStyle = "#FFFFFF"
    // ctx.fillRect(box.position.x, box.position.y, 80, 80)

    ctx.background(0)

    ctx.font = 100 * 0.15 + "px arial";
    ctx.fillStyle = "#FFFFFF"
    ctx.textBaseline = "left";
    ctx.textAlign = "left";
    ctx.fillText("Sound effects obtained from https://www.zapsplat.com", 25, 25)



    if (fakeClock !== null) {
        if (clocks.length !== 0) {
            fakeClock.update();
        }
        fakeClock.draw();
    }

    if (clocks.length === 0) {
        ctx.font = 200 * 0.15 + "px arial";
        ctx.fillStyle = "#FFFFFF"
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText("Click", width / 2, 200)
    }

    for (const clock of clocks) {
        clock.update();
        clock.draw();
    }

    ground.draw();
}