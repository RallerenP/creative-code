import { ctx } from './canvas.js'

/**
 * 
 * @param {number | {r: number, g: number, b: number} | string} _color  
 */
export function background(_color) {
    const { width, height } = ctx.canvas;

    let bg;

    if (typeof _color !== "string") {
        bg = color(_color);
    }

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    document.body.style.background = bg;
}

/**
 * 
 * @param {number | {r: number, g: number, b: number}} color Number or RGB values representing the color
 * @returns {string} Returns the hex representation of the color
 */
export function color(color) {
    if (isNaN(color)) {
        const rHex = decToHex(color.r);
        const gHex = decToHex(color.g);
        const bHex = decToHex(color.b);

        return `#${rHex}${gHex}${bHex}`
    } else {
        const hex = decToHex(color);
        return `#${hex}${hex}${hex}`
    }
    
}

function decToHex(number) {
    return number.toString(16).toUpperCase();
}