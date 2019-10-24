import { ArduinoFrame } from '../arduino/arduino_frame';
import { FrameLocation } from '../frame/frame';
import { Block } from 'blockly';
import { getSensorData } from '../frame/generate_frame';
import { ButtonState } from '../arduino/state/button.state';

export const is_button_pressed_block = (
    block: Block,
    frameLocation: FrameLocation,
    previousFrame?: ArduinoFrame
  ) => {

    const loopNumber = frameLocation.iteration;
    const data = getSensorData();

    return (data[loopNumber].find(
      component => component instanceof ButtonState && component.pin == block.getFieldValue('PIN')
    ) as ButtonState).isPressed;

  };
