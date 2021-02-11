(function(){
    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    const canvas = document.getElementById('sketch');
    const ctx = canvas.getContext("2d");

    const clear = () =>  {
        ctx.clearRect(-canvas.width,-canvas.height, canvas.width * 4, canvas.height * 4)
    }

    const background = () => {
        ctx.fillStyle = "#AA00ED"
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    const drawSquares = () => {
        let tileSize = 30;
        let w = 500;
        let h = 500;
        ctx.translate(w/2, h/2)
        for(let x_tile = 0; x_tile <= w / tileSize; x_tile++) {
            for (let y_tile = 0; y_tile <= h / tileSize ; y_tile++)
            {
                let offsetX = y_tile % 2 === 1 ? tileSize : 0
                let offsetY = x_tile % 2 === 1 ? tileSize : 0

                let x_coord = (x_tile * tileSize) + offsetX;
                let y_coord = (y_tile * tileSize) + offsetY;

                const R = Math.floor(x_coord.map(0, canvas.width, 100, 255)).toString(16)
                const B = Math.floor(y_coord.map(0, canvas.width, 100, 255)).toString(16)

                // ctx.fillStyle = "#" + R + "00"+ B;

                ctx.clearRect(x_coord, y_coord, tileSize, tileSize)
            }
        }
        ctx.translate(-w/2,-h/2)
    }
    let a = 0.1;
    setInterval(() => {

        background()

        ctx.save()
        ctx.translate((canvas.width/2), (canvas.height/2))
        ctx.rotate(a * Math.PI / 180)
        ctx.translate(-(canvas.width/2), -(canvas.height/2))

        drawSquares()

        ctx.restore();

    }, 16)






    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, 30, 30);
    //
    // let increment = 0;
    //
    // document.addEventListener("click", () => {
    //     increment += 30;
    //
    //     clear();
    //     ctx.fillRect(0, increment, 30, 30)
    //     ctx.fillRect(increment, 0, 30, 30)
    // })


})();