class Ground {
    constructor() {
        this.body = Bodies.rectangle(width / 2, height + 10, width, 20, {isStatic: true});
        this.body.friction = 1;
        this.body.frictionStatic = 10;


        World.add(world, this.body)
    }

    draw() {
        const x = this.body.position.x - width / 2;
        const y = this.body.position.y;

        ctx.fillRect(x, y, width, 20)
    }
}