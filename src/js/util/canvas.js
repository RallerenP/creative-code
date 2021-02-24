export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const loop_info = { now: 0 }

/**
 * Starts a loop at a desired framerate. Use only once.
 * @param {function} fn Callback function to loop (usually draw())
 * @param {number} target Target FPS
 */
export function loop(fn, target) {
    let lastTime;
    let requiredElapsed = 1000 / target;

    requestAnimationFrame(inner)

    function inner(now) {
        loop_info.now = now;
        requestAnimationFrame(inner);

        if (!lastTime) {
            lastTime = now;
        }

        const elapsed = now - lastTime;

        if (elapsed > requiredElapsed) {
            fn();

            lastTime = now;
        }
    }
}

function resize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

window.addEventListener('load', function() {
    resize()
})

window.addEventListener('resize', resize)