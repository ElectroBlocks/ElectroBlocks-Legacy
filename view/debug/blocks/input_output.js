
function digital_write_block(block, previousFrame) {

    let digitalWriteFrame = createNewFrame(block, previousFrame);

    let pin = block.getFieldValue('PIN');
    let state = block.getFieldValue('STATE') == 'ON' ? '1' : '0';

    digitalWriteFrame.pins[pin] = {
        type: 'digital',
        state,
        pin
    };

    digitalWriteFrame.move = {};
    digitalWriteFrame.move =  {
        type: 'digital_write_usb',
        state,
        pin
    };

    return [digitalWriteFrame];
}