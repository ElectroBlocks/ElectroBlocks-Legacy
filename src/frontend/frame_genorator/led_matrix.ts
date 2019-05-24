
import {FrameLocation} from "../frame/frame";
import {Block} from "../frame/block";
import {ArduinoFrame} from "../arduino/arduino_frame";
import {LedMatrix, LedInMatrix} from "../arduino/led_matrix";


const hasLedMatrix = (previousFrame?: ArduinoFrame) => {

    if (!previousFrame) {
        return false;
    }

    if (previousFrame.components.filter(component => component instanceof LedMatrix).length == 0) {
        return false;
    }

    return true;
};

export const led_matrix_make_draw_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

    

    block.inputList
        .filter(input => input.fieldRow.length > 1) // filters out the non matrix row
        .forEach(input => {
            input.fieldRow.forEach((field: { name: string, state_: boolean }) => {
                const row = parseInt(field.name.split(',')[0]);
                const column = parseInt(field.name.split(',')[1]);
                const isOn = field.state_;

               // ledMatrixComponent.setLed(new LedInMatrix(isOn, column, row));
            });
        });


    return [];
};
