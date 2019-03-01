/**
 * Created by noahglaser on 2/28/19.
 */


function delay_block_block(block, previousFrame) {
    let frame = createNewFrame(block, previousFrame);

    frame.move = {
       type: 'delay',
       time: Math.abs(getInputValue(block, 'DELAY', previousFrame, 1)) * 1000
    };

    return [frame];
}