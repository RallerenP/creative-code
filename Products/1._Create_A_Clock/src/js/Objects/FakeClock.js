class FakeClock {
    constructor(x, y, r, ctx) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.ctx = ctx;

        document.body.addEventListener("mouseup", (e) => {
            clocks.push(this.toClock());
            fakeClock = null;

            document.body.addEventListener("mousedown", (e) => {
                fakeClock = new FakeClock(e.clientX, e.clientY, 20, ctx);
            }, {once: true});

        }, {once: true});
    }

    toClock() {
        return new Clock(this.x, this.y, this.r, this.ctx)
    }

    update() {
        this.r += 1;
    }

    draw() {
        const {ctx, x, y, r} = this;

        ctx.translate(x, y)

        // --------- Draw circle ---------
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = Math.min(10, 10 * (r / 100));
        const innerR = r - ctx.lineWidth / 2
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

        ctx.strokeStyle = "#FFFFFF"

        const handR = innerR - (30 * (r / 100));

        ctx.strokeStyle = "#FFFFFF"

        const min_a = {cos: Math.cos(time_angles.min), sin: Math.sin(time_angles.min)};
        ctx.line(-(min_a.cos * 10), -(min_a.sin * 10), min_a.cos * handR, min_a.sin * handR)

        // --------- Draw second-hand ---------

        const sec_a = {cos: Math.cos(time_angles.sec), sin: Math.sin(time_angles.sec)};
        ctx.strokeStyle = "#FF0000"
        ctx.line(-(sec_a.cos * 10), -(sec_a.sin * 10), (sec_a.cos * handR), sec_a.sin * handR)

        ctx.translate(-x, -y)

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
    }
}