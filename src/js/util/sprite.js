import { ctx, loop_info } from "./canvas.js";

export class SpriteAnimation {
    index = 0;
    
    /**
     * 
     * @param {Spritesheet} spritesheet Spritesheet containing the animation frames
     * @param {number} offset Number of tiles to offset from beginning of spritesheet (default 0)
     * @param {number} length Amount of frames in the animation
     * @param {number} fps Frames per second.
     */
    constructor(spritesheet, offset, length, fps, loop = true) {
        this.spritesheet = spritesheet;
        this.offset = offset;
        this.length = length;
        this.fps = fps;
        this.loop = loop;
        this.ended = false;

        this.frames = [];

        for (let i = offset; i < length + offset; i++) {
            this.frames.push(spritesheet.getFrame(i));
            
        }

        console.log(this.frames);

        this.current = this.frames[this.index];
        this.time = 1000 / fps;
    }

    update() {
        const { now } = loop_info;
        
        if (!this.lastTime) {
            this.lastTime = now;
        }

        const elapsed = now - this.lastTime;


        if (elapsed > this.time) {
            this.next();
            this.lastTime = now;
        }
       
    }

    draw() {
        this.current.draw();
    }

    next() {
        if (this.loop) {
            this.index = (this.index + 1) % this.length;
            this.current = this.frames[this.index];
            this.ended = false;
        } else if (this.index < this.length - 1) {
            this.index++;
            this.current = this.frames[this.index];
            this.ended = false;
        } else if (!this.ended) {
            this.onEnd();
            this.ended = true;
        }
    }

    onEnd() {
        // Only fires if not looping
    }

    reset() {
        this.index = 0;
    }
}

export class SpriteFrame {
    /**
     * 
     * @param {Image} image Image containing the frame
     * @param {number} x X-Offset (in pixels) where frame begins.
     * @param {number} y Y-Offset (in pixels) where frame ends.
     * @param {number} width Width (in pixels) of the frame.
     * @param {number} height Height (in pixels) of the frame.
     */
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        const {image, x, y, width, height} = this;
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height)
    }
}

export class Spritesheet {
    /**
     * 
     * @param {Image} image Spritesheet
     * @param {number} tileSize Size (in pixels) of a single frame.
     */
    constructor(image, tileW, tileH) {
        this.image = image;
        this.tileW = tileW;
        this.tileH = tileH;
    }

    load() {
        return new Promise((resolve) => {
            this.image.onload = resolve;
        })    
    }

    getFrame(index) {
        const x = Math.floor((index % (this.image.width / this.tileW))) || 0;
        const y = Math.floor((index / (this.image.width / this.tileW))) || 0;

        return new SpriteFrame(this.image, x * this.tileW, y * this.tileH, this.tileW, this.tileH);        
    }
}