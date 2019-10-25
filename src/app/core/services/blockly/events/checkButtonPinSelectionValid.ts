
export const checkRightPinSelected = (workspace, sensorBlockTypes: string[], setupBlockType: string) => {
   const buttonBlocks = workspace
     .getAllBlocks()
     .filter((block) =>  sensorBlockTypes.includes(block.type));

    const availablePins = workspace
      .getAllBlocks()
      .filter((block) => block.type === setupBlockType)
      .map((block) => block.getFieldValue('PIN'));

    if (availablePins.length === 0) {
        return;
    }

    buttonBlocks.forEach(block => {
        if (!availablePins.includes(block.getFieldValue('PIN'))) {
            block.getField('PIN').setValue(availablePins[0]);
        }
    });
};

// ''
