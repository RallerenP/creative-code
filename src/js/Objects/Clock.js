class Clock {
    constructor(x, y, r, ctx) {
        this.body = Bodies.circle(x, y, r, {isStatic: false}, 250);
        this.body.friction = 1;
        this.body.frictionStatic = 10;
        this.body.__prevVel = 0;

        this.r = r;

        World.add(world, this.body);

        this.ctx = ctx;
    }

    update() {
        const velDiffY = Math.abs(this.body.velocity.y - this.body.__prevVel.y);
        if (velDiffY > 1.5) clack.play();

        this.body.__prevVel = {...this.body.velocity };
    }


    draw() {
        const {ctx, r} = this;
        const x = this.body.position.x;
        const y = this.body.position.y;

        ctx.save()

        ctx.translate(x, y)
        ctx.rotate(this.body.angle)

        // --------- Draw circle ---------
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = Math.min(10, 10 * (r / 100));
        const innerR = r - (ctx.lineWidth / 2)
        ctx.circle(0, 0, innerR)

        // --------- Draw numbers ---------
        ctx.font = 50 * 0.15 + "px arial";
        ctx.fillStyle = "#FFFFFF"
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const numbersR = innerR - (20 * (r / 100))
        for (let i = 1; i < 13; i++) {
            const a = ((((Math.PI * 2) / 12)) * (i % 12)) - (Math.PI / 2);
            ctx.fillText(i, Math.cos(a) * numbersR, Math.sin(a) * numbersR)
        }

        const time_angles = calculateTimeAngles();

        ctx.lineWidth = 2;

        // --------- Draw hour-hand ---------

        ctx.strokeStyle = "#FFFFFF"

        const h_a = {cos: Math.cos(time_angles.h), sin: Math.sin(time_angles.h)}
        ctx.line(-(h_a.cos * 10), -(h_a.sin * 10), h_a.cos * (r / 2), h_a.sin * (r / 2))

        // --------- Draw minute-hand ---------

        const handR = innerR - (30 * (r / 100));

        ctx.strokeStyle = "#FFFFFF"

        const min_a = {cos: Math.cos(time_angles.min), sin: Math.sin(time_angles.min)};
        ctx.line(-(min_a.cos * 10), -(min_a.sin * 10), min_a.cos * handR, min_a.sin * handR)

        // --------- Draw second-hand ---------

        const sec_a = {cos: Math.cos(time_angles.sec), sin: Math.sin(time_angles.sec)};
        ctx.strokeStyle = "#FF0000"
        ctx.line(-(sec_a.cos * 10), -(sec_a.sin * 10), (sec_a.cos * handR), sec_a.sin * handR)

        function valueToAngle(val, max) {
            return ((((Math.PI * 2) / max)) * (val % max)) - (Math.PI / 2);
        }

        function calculateTimeAngles() {

            const date = new Date();
            const sec_val = 1000 * date.getSeconds() + date.getMilliseconds();
            const sec = valueToAngle(sec_val, 60000);
            const min_val = 60000 * date.getMinutes() + sec_val;
            const min = valueToAngle(min_val,3600000);
            const h_val = 3600000 * date.getHours() + min_val;
            const h = valueToAngle(h_val,86400000 / 2);
            return {sec, min, h}

        }
        ctx.translate(-x, -y);
        ctx.restore()
    }


}