import { selectedBoard } from '../types/pins';
import { defineBlocksWithJsonArray } from 'blockly';
import * as Blockly from 'blockly/core';
import { loopTimes } from './debug_extensions';
import { COLOR_THEME } from './color_theme';

defineBlocksWithJsonArray([
  {
    type: 'temp_get_temp',
    message0: '%1 Temperature in Celsius%2 Temperature (readonly) = %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/temp/temp.png',
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
    colour: COLOR_THEME.SENSOR,
    tooltip: '',
    helpUrl: ''
  },

  {
    type: 'temp_get_humidity',
    message0: '%1 Humidity percentage?%2 Humidity (readonly) = %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/temp/temp.png',
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
    colour: COLOR_THEME.SENSOR,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['temp_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage('./assets/blocks/temp/temp.png', 15, 15, {
          alt: '*',
          flipRtl: 'FALSE'
        })
      )
      .appendField('Setup Temperature Sensor');
    this.appendDummyInput()
      .appendField('Pin# ')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().digitalPins),
        'PIN'
      );
    this.appendDummyInput().appendField(
      '------------------------------------------'
    );
    this.appendDummyInput()
      .appendField('Loop')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return loopTimes();
        }),
        'LOOP'
      );
    this.appendDummyInput()
      .appendField('Temperature Celsius ')
      .appendField(new Blockly.FieldNumber(30, -200, 300, 0.00001), 'temp');
    this.appendDummyInput()
      .appendField('Humidity ')
      .appendField(new Blockly.FieldNumber(5, 0, 300), 'humidity');
    this.setColour(COLOR_THEME.SENSOR);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
