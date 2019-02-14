/**
 * Created by noahglaser on 2/12/19.
 */

continueBtn.addEventListener('click', () => {
    var arduinoBlock = Blockly.mainWorkspace.getAllBlocks().filter(function (block) {
        return block.type == 'arduino_start';
    })[0];

    var setupFrames  = generateSetupFrames(arduinoBlock);

    console.log(setupFrames);

    console.log(JSON.stringify(setupFrames));
});

function generateSetupFrames(arduinoBlock) {

    var firstBlock = arduinoBlock.getInputTargetBlock('setup');

    if (!firstBlock) {

        return [];
    }


    return getFrames(firstBlock);
}

function getFrames(topBlock) {
    var blockList = [];
    var frames = [];

    do {
        blockList.push(topBlock);

        if (!topBlock.nextConnection) {
            topBlock = null;
            break;
        }

        topBlock = topBlock.nextConnection.targetBlock();
    } while(topBlock);

    var previousFrame = null;

    for (var i = 0; i < blockList.length; i += 1) {
        var block = blockList[i];
        var currentFrame = functionList[block.type](block, previousFrame);
        frames.push(currentFrame);
        previousFrame = copyFrame(currentFrame);
    }

    return frames;
}

