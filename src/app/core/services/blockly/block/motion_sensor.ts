import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'ultra_sonic_sensor_motion',
    message0:
      '%1 Ultrasonic sensor distance (cm)%2 Distance in cm (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/motion_sensor/ultrasonic_sensor.png',
        width: 30,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'SIMPLE_DEBUG',
        checked: false
      }
    ],
    output: 'Number',
    colour: COLOR_THEME.SENSOR,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  }
]);

Blockly.Blocks['ultra_sonic_sensor_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/motion_sensor/ultrasonic_sensor.png',
          30,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Setup Ultrasonic Sensor');
    this.appendDummyInput()
      .appendField('Trig Pin# ')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().digitalPins),
        'TRIG'
      )
      .appendField('Echo Pin# ')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().digitalPins),
        'ECHO'
      );
    this.appendDummyInput('SHOW_CODE_VIEW').appendField(
      '------------------------------------------------'
    );
    this.appendDummyInput()
      .appendField('Loop')
      .appendField(new Blockly.FieldDropdown(() => loopTimes()), 'LOOP');
    this.appendDummyInput()
      .appendField('Distance In CMs')
      .appendField(new Blockly.FieldNumber(1, 0.1, 500, 0.00001), 'cm');
    this.setColour(COLOR_THEME.SENSOR);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
