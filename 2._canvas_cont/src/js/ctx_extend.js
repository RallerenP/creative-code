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