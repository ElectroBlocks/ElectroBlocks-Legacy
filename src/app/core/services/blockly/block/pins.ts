import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import * as Blockly from 'blockly/core';
import { loopTimes, getAvialablePinsFromSetupBlock } from './debug_extensions';
import { BlocklyService } from '../../blockly.service';

defineBlocksWithJsonArray([
  {
    type: 'digital_write',
    message0: '%1 Turn  %2 pin# %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/digital_write.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'STATE',
        options: [['on', 'ON'], ['off', 'OFF']]
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().digitalPins
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'analog_read',
    message0: '%1 Read number from analog pin# %2',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/analog_read.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      }
    ],
    output: 'Number',
    colour: 260,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'analog_write',
    message0: '%1 Send analog wave to pin %2 %3 Wave Intensity %4',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/arduino/analog_write.png',
        width: 15,
        height: 20,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_value',
        name: 'WRITE_VALUE',
        check: 'Number',
        align: 'RIGHT'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 260,
    tooltip: '',
    helpUrl: ''
  }
]);

Blockly.Blocks['analog_read'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/arduino/analog_read.png',
          15,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Read number from analog pin#')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return getAvialablePinsFromSetupBlock('analog_read_setup');
        }),
        'PIN'
      );
    this.appendDummyInput()
      .appendField('Power Level (readonly)')
      .appendField(
        new Blockly.FieldTextInput('', value => {
          if (BlocklyService.DISABLE_READONLY_CHECK) {
            return value;
          }

          return null;
        }),
        'SIMPLE_DEBUG'
      );
    this.setOutput(true, 'Number');
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['digital_read'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/arduino/digital_read.png',
          15,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Is electricity running through pin#')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return getAvialablePinsFromSetupBlock('digital_read_setup');
        }),
        'PIN'
      );
    this.appendDummyInput()
      .appendField('Has Electricity? (readonly) ')
      .appendField(
        new Blockly.FieldCheckbox('FALSE', value => {
          if (BlocklyService.DISABLE_READONLY_CHECK) {
            return value;
          }

          return null;
        }),
        'SIMPLE_DEBUG'
      );
    this.setOutput(true, 'Boolean');
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['digital_read_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/arduino/digital_read.png',
          15,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Setup Digital Read Pin');
    this.appendDummyInput()
      .appendField('PIN #')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().digitalPins),
        'PIN'
      );
    this.appendDummyInput('SHOW_CODE_VIEW').appendField(
      '------------------------------------'
    );
    this.appendDummyInput('LOOP_TIMES')
      .appendField('Loop')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return loopTimes();
        }),
        'LOOP'
      );
    this.appendDummyInput()
      .appendField('Has Power? ')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'has_power');
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['analog_read_setup'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldImage(
          './assets/blocks/arduino/analog_read.png',
          15,
          15,
          { alt: '*', flipRtl: 'FALSE' }
        )
      )
      .appendField('Analog Read Setup');
    this.appendDummyInput()
      .appendField('PIN #')
      .appendField(
        new Blockly.FieldDropdown(selectedBoard().analogPins),
        'PIN'
      );
    this.appendDummyInput().appendField('------------------------------------');
    this.appendDummyInput('LOOP_TIMES')
      .appendField('Loop')
      .appendField(
        new Blockly.FieldDropdown(() => {
          return loopTimes();
        }),
        'LOOP'
      );
    this.appendDummyInput()
      .appendField('Power Level')
      .appendField(
        new Blockly.FieldNumber(10, 0, 256, 0.000001),
        'power_level'
      );
    this.setColour(260);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
