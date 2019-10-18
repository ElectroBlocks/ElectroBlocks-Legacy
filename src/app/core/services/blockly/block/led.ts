import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'led',
    message0: '%1 Turn  %2 led  %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/led/led.png',
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
    colour: 230,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'led_fade',
    message0: '%1 Fade Led# %2 to  %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/led/led.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().pwmPins
      },
      {
        type: 'input_value',
        name: 'FADE',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'led_color_setup',
    lastDummyAlign0: 'RIGHT',
    message0:
      '%1 Color Led Setup %2 Picture Type:  %3 %4 Red Green Blue Wires:  %5',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/led/color_led.png',
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
        name: 'PICTURE_TYPE',
        options: [['Breadboard', 'BREADBOARD'], ['Built In', 'BUILT_IN']]
      },
      {
        type: 'input_dummy',
        align: 'RIGHT'
      },
      {
        type: 'field_dropdown',
        name: 'WIRE',
        options: [['6 - 5 - 3', '6-5-3'], ['11 - 10 - 9', '11-10-9']]
      }
    ],
    colour: 230,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'set_color_led',
    message0: "%1 Set Color Led's Color %2",
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/led/color_led.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_value',
        name: 'COLOUR',
        check: 'Colour'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: '',
    helpUrl: ''
  }
]);
