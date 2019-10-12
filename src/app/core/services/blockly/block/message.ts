import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  {
    type: 'arduino_receive_message',
    message0: '%1 arduino receiving message?',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/message/message.png',
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
  },
  {
    type: 'arduino_get_message',
    message0: '%1 arduino get message.',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/message/message.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'String',
    colour: 20,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'arduino_send_message',
    message0: '%1 Arduino send message %2',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/message/message.png',
        width: 15,
        height: 15,
        alt: '*',
        flipRtl: false
      },
      {
        type: 'input_value',
        name: 'MESSAGE',
        check: 'String'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 20,
    tooltip: '',
    helpUrl: ''
  }
]);
