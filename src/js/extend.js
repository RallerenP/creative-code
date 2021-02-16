const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

const canvasPrototype = CanvasRenderingContext2D.prototype;

canvasPrototype.circle = function(x, y, r) {
    this.beginPath();
    this.arc(x, y, r, 0, 2*Math.PI);
    this.stroke();
}

canvasPrototype.line = function(x_1, y_1, x_2, y_2) {
    this.beginPath();
    this.moveTo(x_1, y_1);
    this.lineTo(x_2, y_2);
    this.stroke();
}

canvasPrototype.triangle = function(x_1, y_1, x_2, y_2, x_3, y_3) {
    this.beginPath();
    this.moveTo(x_1, y_1);
    this.lineTo(x_2, y_2);
    this.lineTo(x_3, y_3);
    this.closePath();
    this.stroke();
}

canvasPrototype.fillTriangle = function(x_1, y_1, x_2, y_2, x_3, y_3) {
    this.beginPath();
    this.moveTo(x_1, y_1);
    this.lineTo(x_2, y_2);
    this.lineTo(x_3, y_3);
    this.fill();
}

canvasPrototype.background = function(brightness) {
    if (typeof brightness === "number"){
        const _brightness = decToHex(brightness);
        this.fillStyle = `#${_brightness}${_brightness}${_brightness}`
    }
    else if (typeof brightness === "string") {
        this.fillStyle = brightness
    }

    this.fillRect(0,0, this.canvas.width, this.canvas.height);
}

function decToHex(number) {
    return number.toString(16).toUpperCase();
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}