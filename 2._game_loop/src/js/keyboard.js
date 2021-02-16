class Keyboard {
    static getInstance() { return this.instance };
    static instance = new Keyboard();
    
    constructor() {
        window.onkeydown = function(e) {  }
        window.addEventListener("keydown", (e) => {
            if (this.pressedKeys[e.key.toUpperCase()] !== true) {
                this.keydown(e.key)
                this.pressedKeys[e.key.toUpperCase()] = true
            }
        });
        window.addEventListener("keyup", (e) => {
            delete this.pressedKeys[e.key.toUpperCase()];
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
    
    
}