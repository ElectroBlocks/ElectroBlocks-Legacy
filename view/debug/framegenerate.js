/**
 * Created by noahglaser on 2/12/19.
 */

continueBtn.addEventListener('click', () => {
    let arduinoBlock = Blockly.mainWorkspace.getAllBlocks().filter(function (block) {
        return block.type == 'arduino_start';
    })[0];

    let setupFrames  = generateSetupFrames(arduinoBlock);

    window.console.log(setupFrames);

    window.console.log(JSON.stringify(setupFrames));
});

function generateSetupFrames(arduinoBlock) {

    let firstBlock = arduinoBlock.getInputTargetBlock('setup');

    if (!firstBlock) {

        return [];
    }


    return getFrames(firstBlock);
}

function getFrames(topBlock) {
    let blockList = [];
    let frames = [];

    do {
        blockList.push(topBlock);

        if (!topBlock.nextConnection) {
            topBlock = null;
            break;
        }

        topBlock = topBlock.nextConnection.targetBlock();
    } while(topBlock);

    let previousFrame = null;

    for (let i = 0; i < blockList.length; i += 1) {
        let block = blockList[i];
        let currentFrame = functionList[block.type](block, previousFrame);
        frames.push(currentFrame);
        previousFrame = copyFrame(currentFrame);
    }

    return frames;
}

