import { ctx, canvas } from '../util/canvas.js';
import { Keyboard } from '../util/Keyboard.js';
import { SpriteAnimation, Spritesheet } from '../util/sprite.js';

export class Player {
    isRunning = false;
    isJumping = false;
    isFalling = false;

    direction = "RIGHT";

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.runSpeed = 8;

        this.vely = 0;
        this.accy = 0.5;
        
        this.animations = {
            IDLE: null,
            RUN: null,
            FALL: null,
            JUMP: null,
            MEDITATE_INIT: null,
            MEDITATE: null,
        }
    }

    async load() {
        const image = new Image();
        image.src = "./assets/player.png";
    
        const sheet = new Spritesheet(image, 384, 128);

        await sheet.load();

        this.animations = {
            IDLE: new SpriteAnimation(sheet, 0, 6, 6),
            RUN: new SpriteAnimation(sheet, 25, 8, 6),
            FALL: new SpriteAnimation(sheet, 75, 3, 6),
            JUMP: new SpriteAnimation(sheet, 50, 3, 6),
            MEDITATE_INIT: new SpriteAnimation(sheet, 200, 15, 6, false),
            MEDITATE: new SpriteAnimation(sheet, 206, 8, 6)
        };

        this.animations.MEDITATE_INIT.onEnd = () => {
            this.isInitiatingMeditation = false;
            this.isMeditating = true;
        }

        this.animation = this.animations.IDLE;
    }

    update() {
        this.animation.update();

        if (Keyboard.isKeyDown("A") && Keyboard.isKeyDown("D")) {
            this.isMeditating = false;
            this.idle();
        } else if (Keyboard.isKeyDown("D")) {
            this.isMeditating = false;
            this.run("RIGHT");
        } else if (Keyboard.isKeyDown("A")) {
            this.isMeditating = false;
            this.run("LEFT");
        } else if (Keyboard.isKeyDown("B")) {
            this.isInitiatingMeditation = true;
            
        } else {
            this.idle();
        }

        if (Keyboard.isKeyDown("W")) {
            this.isMeditating = false;
            this.jump();  
        }

        this.vely += this.accy;
        this.y += this.vely;

        this.collide()

        if (isNaN(this.lastY)) {
            this.lastY = this.y;
        }

        if (this.lastY < this.y) {
            this.isFalling = true;
            this.isJumping = false;
        }

        if (this.lastY > this.y) {
            this.isJumping = true;
        } 

        this.lastY = this.y;

        this.useProperAnimation()
    }

    draw() {
        ctx.save();
        switch (this.direction) {
            case "RIGHT": 
                ctx.translate((-384 / 2) + this.x, (-128 / 2) + this.y)
                this.animation.draw();
                break;
            case "LEFT":
                ctx.translate(384 + (-384 / 2) + this.x, -128 / 2 + this.y)
                ctx.scale(-1, 1)
                this.animation.draw();
                break;
        }
        ctx.restore();
    }

    changeAnimation(animation) {
        let reset = true;
        if (this.animation === animation) {
            reset = false;
        }
        this.animation = animation;
        if (reset) {
            this.animation.reset();
        }
        
    }

    useProperAnimation() {
        if (this.isJumping) {
            this.changeAnimation(this.animations.JUMP)
        } else if (this.isFalling) {
            this.changeAnimation(this.animations.FALL)  
        } else if (this.isRunning) {
            this.changeAnimation(this.animations.RUN);
        } else if (this.isMeditating) {
            this.changeAnimation(this.animations.MEDITATE);  
        } else if (this.isInitiatingMeditation) {
            this.changeAnimation(this.animations.MEDITATE_INIT)  
        } else {
            this.changeAnimation(this.animations.IDLE);
        }
    }

    run(direction) {
        this.direction = direction;

        this.isRunning = true && !this.isInitiatingMeditation;

        if (direction === "RIGHT") {
            this.x += this.runSpeed;
        }

        if (direction === "LEFT") {
            this.x -= this.runSpeed;
        }
    }

    idle() {
        if (this.isRunning) {
            this.isRunning = false;
        }
    }

    collide() {
        const { height } = canvas;

        if (height - (this.y + (94 / 2)) < 20) {
            this.y = (height - (94 / 2)) - 20
            this.vely = 0;
            this.isFalling = false;
        }
    }

    jump() {
        if (!this.isJumping && !this.isFalling) {
            this.vely = -16;
        }
    }
}