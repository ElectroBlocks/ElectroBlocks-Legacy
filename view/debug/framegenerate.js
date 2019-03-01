/**
 * Created by noahglaser on 2/12/19.
 */

continueBtn.addEventListener('click', () => {
    let arduinoBlock = Blockly.mainWorkspace.getAllBlocks().filter(function (block) {
        return block.type == 'arduino_start';
    })[0];

    let topBlocks = Blockly
                    .mainWorkspace
                    .getTopBlocks()
                    .filter(block => block.type != 'arduino_start');

    let frames = [];

    topBlocks
        .filter(block => block.type != 'procedures_defnoreturn')
        .forEach(block => {
        functionList[block.type + '_block'](block, frames.length == 0 ? null : frames[frames.length - 1])
            .forEach(currentFrame => frames.push(currentFrame));
    });

    let setupFrames = generateFrameForInputStatement(
        arduinoBlock,
        'setup',
        frames.length == 0 ? null : copyFrame(frames[frames.length - 1])
    );

    setupFrames.forEach(currentFrame => frames.push(currentFrame));


    window.console.log(frames);

    window.console.log(JSON.stringify(frames));

    executeFrames(frames, 0);

});


