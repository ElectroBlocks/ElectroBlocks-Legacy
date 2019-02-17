/**
 * Created by noahglaser on 2/12/19.
 */

continueBtn.addEventListener('click', () => {
    let arduinoBlock = Blockly.mainWorkspace.getAllBlocks().filter(function (block) {
        return block.type == 'arduino_start';
    })[0];

    let setupFrames  = generateFrameForInputStatement(arduinoBlock, 'setup');

    window.console.log(setupFrames);

    window.console.log(JSON.stringify(setupFrames));
});



