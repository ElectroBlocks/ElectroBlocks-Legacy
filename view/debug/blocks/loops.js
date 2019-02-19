/**
 * a count with block without an index
 *
 * @param block
 * @param previousFrame
 * @return {*}
 */
function controls_repeat_ext_block(block, previousFrame) {
    let loopFrame = previousFrame || newFrame();
    loopFrame.blockId = block.id;

    let times = getInputValue(block, 'TIMES', previousFrame, 1);

    if (times <= 0) {
        return [loopFrame];
    }

    let frames = generateFrameForInputStatement(block, 'DO', copyFrame(loopFrame));
    frames.unshift(loopFrame);

    for (let i = 1; i < times; i += 1) {
        previousFrame = copyFrame(frames[frames.length - 1]);
        frames = frames.concat(generateFrameForInputStatement(block, 'DO', previousFrame));
    }

    return frames;
}

/**
 * A for / count with block
 *
 * @param block
 * @param previousFrame
 * @return {*}
 */
function controls_for_block(block, previousFrame) {

    let loopFrame = previousFrame || newFrame();
    loopFrame.blockId = block.id;

    let start = parseInt(getInputValue(block, 'FROM', previousFrame, 1));

    let to = parseInt(getInputValue(block, 'TO', previousFrame, 1));

    let by = Math.abs(getInputValue(block, 'BY', previousFrame, 1));

    let indexVariableName = getVariableName(block);
    loopFrame.variables[indexVariableName] = {
        value: start,
        type: 'Number',
        name: indexVariableName
    };

    let frames =  generateFrameForInputStatement(block, 'DO', copyFrame(loopFrame));
    frames.unshift(loopFrame);

    if (to == start) {
        return frames;
    }

    by *= to > start ? 1 : -1;

    let index = start + by;

    while(checkLoop(index, to, to > start))  {
        let nextLoopFrame = copyFrame(frames[frames.length - 1]);
        nextLoopFrame.blockId = block.id;
        nextLoopFrame.variables[indexVariableName].value = index;
        frames.push(nextLoopFrame); // so that it copies the value and not the reference
        frames = frames.concat(generateFrameForInputStatement(block, 'DO', copyFrame(nextLoopFrame)));
        index += by;
    }

    return frames;
}

/**
 * Checks in the count with block if it should exit it
 *
 * @param index
 * @param to
 * @param isPositive
 * @return {boolean}
 */
function checkLoop(index, to, isPositive) {
    if (isPositive) {
        return index <= to;
    }

    return index >= to;
}