/**
 * Returns a colour object
 *
 * @param block
 * @param previousFrame
 * @return {{r: *, g: *, b: *}}
 */
function colour_picker_block(block, previousFrame) {
    let value = block.getFieldValue('COLOUR');

    return hexToRgb(value)
}

/**
 * Returns a random colour object
 *
 * @param block
 * @param previousFrame
 * @return {{r: *, g: *, b: *}}
 */
function colour_random_block(block, previousFrame) {

    return { r: getRandomInt(0, 255), g : getRandomInt(0, 255), b: getRandomInt(0, 255) };
}

/**
 * Returns a colour object
 *
 * @param block
 * @param previousFrame
 * @return {{r: Number, g: Number, b: Number}}
 */
function colour_rgb_block(block, previousFrame) {
    let red = getInputValue(block, 'RED', previousFrame, 0);
    let green = getInputValue(block, 'GREEN', previousFrame, 0);
    let blue = getInputValue(block, 'BLUE', previousFrame, 0);

    return { r: parseInt(red), g : parseInt(green), b: parseInt(blue) };

}

/**
 * Converts a #332323 hex string to rgb colour object
 *
 * @param hex
 * @return {*}
 */
function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
}