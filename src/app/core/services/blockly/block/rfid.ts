import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';
import './debug_extensions';

defineBlocksWithJsonArray([
  {
    type: 'rfid_scan',
    message0:
      '%1 Did RFID read scan a new card? %2 new card? (readonly) %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'field_checkbox',
        name: 'SIMPLE_DEBUG',
        checked: false
      }
    ],
    inputsInline: false,
    output: 'Boolean',
    colour: 260,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'rfid_card',
    lastDummyAlign0: 'RIGHT',
    metadata: 'blue',
    message0: '%1 Get RFID Card Number %2 RFID Card# (readonly) = %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'field_input',
        name: 'SIMPLE_DEBUG',
        text: `ex_card_num`
      }
    ],
    inputsInline: false,
    output: 'String',
    colour: 260,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug']
  },
  {
    type: 'rfid_tag',
    lastDummyAlign0: 'RIGHT',
    metadata: 'blue',
    message0: '%1 Get RFID Tag %2 RFID Tag # (readonly) = %3',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
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
        text: `ex_tag_num`
      }
    ],
    inputsInline: false,
    output: 'String',
    colour: 260,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'rfid_setup',
    message0:
      '%1 RFID Setup %2 RX Pin# %3 TX Pin# %4 %5  ----------------------------------------- %6 Loop %7 Scanned Card? %8 %9 Card #: %10 %11 Tag: %12',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/rfid/rfid.png',
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
        name: 'RX',
        options: selectedBoard().digitalPins
      },
      {
        type: 'field_dropdown',
        name: 'TX',
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
        input: '',
        name: 'LOOP_INPUT'
      },
      {
        type: 'field_checkbox',
        name: 'scanned_card',
        checked: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'card_number',
        text: 'card_number'
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_input',
        name: 'tag',
        text: 'tag'
      }
    ],
    colour: 260,
    tooltip: '',
    helpUrl: '',
    extensions: ['debug-setup']
  }
]);
