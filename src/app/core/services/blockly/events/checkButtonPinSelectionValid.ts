
export const checkButtonPinSelectionValid = workspace => {
   const buttonBlocks =workspace
        .getAllBlocks()
        .filter(block => block.type == 'is_button_pressed');

    const availablePins = workspace
        .getAllBlocks()
        .filter(block => block.type === 'push_button_setup')
        .map(block => block.getFieldValue('PIN'));

    if (availablePins.length === 0) {
        return;
    }
    
    buttonBlocks.forEach(block => {
        if (!availablePins.includes(block.getFieldValue('PIN'))) {
            block.getField('PIN').setValue(availablePins[0]);
        }
    });
};