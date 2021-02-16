(function(){
    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    const canvas = document.getElementById('sketch');
    const ctx = canvas.getContext("2d");

    const height = canvas.height;
    const width = canvas.width;
    
    const keyboard = Keyboard.getInstance()

    const clear = () =>  {
        ctx.clearRect(-canvas.width,-canvas.height, canvas.width * 4, canvas.height * 4)
    }

    keydown = (key) => {
        
    }

    setInterval(() => {
        keyboard.check(keydown);
        draw();
    }, 16)


    function draw() {
        ctx.background("#00FF00");
    }
})();
//
//
//
//
//

window.onload = function() {
    console.log("hello")
}



