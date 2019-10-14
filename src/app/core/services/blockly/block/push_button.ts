import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import * as Blockly from 'blockly/core';
import { BlocklyService } from '../../blockly.service';

defineBlocksWithJsonArray([
  {
    type: 'push_button_setup',
    message0:
      '%1 Setup Button %2 Connected to PIN# %3 %4 ------------------------------------- %5 Loop   %6 Is button pressed: %7',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/push_button/push_button.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().digitalPins
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_dummy',
        name: 'SHOW_CODE_VIEW'
      },
      {
        type: 'input_dummy',
        name: 'LOOP_INPUT'

      },
      {
        type: 'field_checkbox',
        name: 'is_pressed',
        checked: true
      }
    ],
    colour: 260,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug-setup']
  }
]);

Blockly.Blocks['is_button_pressed'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("./assets/blocks/push_button/push_button.png", 15, 15, "*"))
        .appendField("Is button")
        .appendField(new Blockly.FieldDropdown(() => {
            const pins = Blockly.getMainWorkspace()
              .getAllBlocks()
              .filter(block => block.type === 'push_button_setup')
              .map(block => [block.getFieldValue('PIN'), block.getFieldValue('PIN')]);
            
            if (pins.length === 0) {
              return selectedBoard().digitalPins;
            }  

            return pins;
        }), "PIN")
        .appendField("pressed?");

    this.appendDummyInput('LOOP_INPUT')
        .appendField("Is button pressed? (readonly) ")
        .appendField(new Blockly.FieldCheckbox("FALSE", value => {
          if (BlocklyService.DISABLE_READONLY_CHECK) {
            return value;
          }
      
          return null;
      
        }), "SIMPLE_DEBUG");

        this.setOutput(true, 'Boolean');

        console.log(this);
    this.setColour(260);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
