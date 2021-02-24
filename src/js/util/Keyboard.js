class _Keyboard {
    lastKeyDown = null;
    
    constructor() {
        window.addEventListener("keydown", (e) => {
            if (this.pressedKeys[e.key.toUpperCase()] !== true) {
                this.keydown(e.key)
                this.pressedKeys[e.key.toUpperCase()] = true
            }

            this.lastKeyDown = e.key.toUpperCase();
        });
        window.addEventListener("keyup", (e) => {
            delete this.pressedKeys[e.key.toUpperCase()];
            this.lastKeyDown = null;
        })
    }

    keydown() { /* NOT IMPLEMENTED */ };
   
    
    isKeyDown(key) {
        return this.pressedKeys[key.toUpperCase()] || false;
    }

    check(fn) {
        Object.keys(this.pressedKeys).forEach((key) => {
            if (this.pressedKeys[key] === true) {
                fn(key)
            }
        })
    }

    pressedKeys = {}

    update() {
        
    }
}

export const Keyboard = new _Keyboard();