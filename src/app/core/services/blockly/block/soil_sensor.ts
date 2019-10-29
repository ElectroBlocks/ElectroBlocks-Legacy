import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';

defineBlocksWithJsonArray([
  {
    type: 'soil_humidity_percentage',
    message0: '%1 Soil humidity percentage%2 humidity % (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/soil_sensor/soil_sensor.png',
        width: 15,
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
        text: ``
      }
    ],
    output: 'Number',
    colour: 20,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'soil_humidity_value',
    message0: '%1 Soil humidity value%2 humidity (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/soil_sensor/soil_sensor.png',
        width: 15,
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
        text: ``
      }
    ],
    output: 'Number',
    colour: 20,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'soil_is_raining',
    message0: '%1 Is soil sensor sensing rain?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/soil_sensor/soil_sensor.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Boolean',
    colour: 20,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['soil_sensor_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/soil_sensor/soil_sensor.png',
          15,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Soil Sensor Setup');
    this.appendDummyInput()
      .appendField('Analog Pin#')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().analogPins),
        'PIN'
      );
    this.appendDummyInput('SHOW_CODE_VIEW').appendField(
      '----------------------------------'
    );
    this.appendDummyInput()
      .appendField('Loop')
      .appendField(new Blockly.FieldDropdown(() => loopTimes()), 'LOOP');
    this.appendDummyInput()
      .appendField('Is Raining?')
      .appendField(new Blockly.FieldCheckbox('FALSE'), 'is_raining');
    this.appendDummyInput()
      .appendField('Temperature')
      .appendField(new Blockly.FieldNumber(0, -200, 300, 0.00001), 'temp');
    this.appendDummyInput()
      .appendField('Humidity')
      .appendField(new Blockly.FieldNumber(0, -200, 300, 0.00001), 'humidity');

    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
