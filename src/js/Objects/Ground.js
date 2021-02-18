class Ground {
    constructor() {
        this.body = Bodies.rectangle(width / 2, height + 10, width, 20, {isStatic: true});
        this.body.friction = 1;
        this.body.frictionStatic = 10;

        const wallLeft = Bodies.rectangle(-10, height / 2, 20, height, {isStatic: true});
        const wallTop = Bodies.rectangle(width / 2, -10, width, 20, {isStatic: true});
        const wallRight = Bodies.rectangle(width + 10, height / 2, 20, height, {isStatic: true});
        console.log(wallLeft);


        World.add(world, [this.body, wallLeft, wallRight, wallTop])
    }

    draw() {
       
    }
}