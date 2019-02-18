
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