(function(){
    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    const canvas = document.getElementById('sketch');
    const ctx = canvas.getContext("2d");
    const height = canvas.height;
    const width = canvas.width;

    const clear = () =>  {
        ctx.clearRect(-canvas.width,-canvas.height, canvas.width * 4, canvas.height * 4)
    }

    const background = (brightness) => {
        const _brightness = decToHex(brightness);
        ctx.fillStyle = `#${_brightness}${_brightness}${_brightness}`

        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    ctx.circle = function(x, y, r) {
        this.beginPath();
        this.arc(x, y, r, 0, 2*Math.PI);
        this.stroke();
    }

    ctx.line = function(x_1, y_1, x_2, y_2) {
        this.beginPath();
        this.moveTo(x_1, y_1);
        this.lineTo(x_2, y_2);
        this.stroke();
    }

    const secondsToAngle = (date) => {
        let total = 1000 * date.getSeconds() + date.getMilliseconds();
        return ((((Math.PI * 2) / 60000)) * (total % 60000)) - (Math.PI / 2);
    }

    const minutesToAngle = (date) => {
        let total = 1000 * date.getSeconds() + date.getMilliseconds();

    }

    const calculateTimeAngles = () => {
        function valueToAngle(val, max) {
            return ((((Math.PI * 2) / max)) * (val % max)) - (Math.PI / 2);
        }
        const date = new Date();
        const sec_val = 1000 * date.getSeconds() + date.getMilliseconds();
        const sec = valueToAngle(sec_val, 60000);
        const min_val = 60000 * date.getMinutes() + sec_val;
        const min = valueToAngle(min_val,3600000);
        const h_val = 3600000 * date.getHours() + min_val;
        const h = valueToAngle(h_val,86400000 / 2);
        return {sec, min, h}

    }


    setInterval(() => {
        background(0)

        // --------- Draw circle ---------
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 20;
        ctx.circle(width / 2,  height/ 2, 240)

        // --------- Draw numbers ---------
        ctx.font = 50 * 0.15 + "px arial";
        ctx.fillStyle = "#FFFFFF"
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        for (let i = 1; i < 13; i++) {
            const a = ((((Math.PI * 2) / 12)) * (i % 12)) - (Math.PI / 2);
            ctx.fillText(i, width / 2 + Math.cos(a) * 220, height / 2 + Math.sin(a) * 220)
        }

        const time_angles = calculateTimeAngles();

        ctx.lineWidth = 2;

        // --------- Draw hour-hand ---------

        ctx.strokeStyle = "#FFFFFF"

        const h_a = {cos: Math.cos(time_angles.h), sin: Math.sin(time_angles.h)}
        ctx.line(width / 2 - (h_a.cos * 10), height / 2 - (h_a.sin * 10), (width / 2) + (h_a.cos * 110), (height / 2) + h_a.sin * 110)

        // --------- Draw minute-hand ---------

        ctx.strokeStyle = "#FFFFFF"

        const min_a = {cos: Math.cos(time_angles.min), sin: Math.sin(time_angles.min)};
        ctx.line(width / 2 - (min_a.cos * 10), height / 2 - (min_a.sin * 10), (width / 2) + (min_a.cos * 220), (height / 2) + min_a.sin * 220)

        // --------- Draw second-hand ---------

        const sec_a = {cos: Math.cos(time_angles.sec), sin: Math.sin(time_angles.sec)};
        ctx.strokeStyle = "#FF0000"
        ctx.line(width / 2 - (sec_a.cos * 10), height / 2 - (sec_a.sin * 10), (width / 2) + (sec_a.cos * 220), (height / 2) + sec_a.sin * 220)





    }, 16)
})();

function decToHex(number) {
    return number.toString().toUpperCase();
}