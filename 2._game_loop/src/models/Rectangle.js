export function greeting() {
    console.log("Hello");
} 

export class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w; 
        this.h = h;
    }

    getArea() {
        return this.w * this.h;
    }
}