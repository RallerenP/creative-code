(function(){
    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        rety
        urn (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    const canvas = document.getElementById('sketch');
    const ctx = canvas.getContext("2d");

    const height = canvas.height;
    const width = canvas.width;
    
    const keyboard = Keyboard.getInstance()

    const clear = () =>  {
        ctx.clearRect(-canvas.width,-canvas.height, canvas.width * 4, canvas.height * 4)
    }

    const background = (brightness) => {
        if (typeof brightness === "number"){
            const _brightness = decToHex(brightness);
            ctx.fillStyle = `#${_brightness}${_brightness}${_brightness}`
        } 
        else if (typeof brightness === "string") {
            ctx.fillStyle = brightness
        } 

        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    keyboard.keydown = (key) => {
        key = key.toUpperCase();
        console.log(key);
        
        switch (key) {
            case "W":
                p_y -= 1;
                break;
            case "A":
                p_x -= 1;
                break;
            case "S":
                p_y += 1; 
                break;
            case "D":
                p_x += 1;
                break;
        }
    }

    setInterval(() => {
        keyboard.check();
        draw();
    }, 16)

    let score = 0;
    let p_x = 0;
    let p_y = 0;

    function draw() {
        background("#00FF00");
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillStyle = "#0000FF"
        ctx.fillTriangle(p_x, p_y, p_x, p_y + 200, p_x + 200, p_y + 200);

        ctx.font = "30px Times New Roman";
        ctx.fillText("Score: " + score , 10, 50);
    }
})();

function decToHex(number) {
    return number.toString(16).toUpperCase();
}