import { selectedBoard } from '../types/pins';
import { defineBlocksWithJsonArray } from 'blockly';
defineBlocksWithJsonArray([
  {
    type: 'temp_setup',
    lastDummyAlign0: 'RIGHT',
    message0: '%1 Setup Temperature Sensor %2 Pin# %3',
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
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().digitalPins
      }
    ],
    colour: 330,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'temp_get_temp',
    message0: '%1 Temperature in Celsius',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/temp/temp.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Number',
    colour: 330,
    tooltip: '',
    helpUrl: ''
  },

  {
    type: 'temp_get_humidity',
    message0: '%1 Humidity percentage?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/temp/temp.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Number',
    colour: 330,
    tooltip: '',
    helpUrl: ''
  }
]);
