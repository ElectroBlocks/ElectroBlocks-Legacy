import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'soil_sensor_setup_2',
    message0:
      '%1 Soil Sensor Setup %2 Analog Pin# %3 %4 ----------------------------- %5 Loop  %6 %7 Is Raining? %8 %9 Temperature %10 %11 Humidity %12',
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
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_dropdown',
        name: 'loop',
        options: [['1', '1'], ['2', '2'], ['3', '3']]
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_checkbox',
        name: 'SCANNED_CARD',
        checked: false
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_number',
        name: 'TEMP',
        value: 50,
        min: -30,
        max: 500
      },
      {
        type: 'input_dummy'
      },
      {
        type: 'field_number',
        name: 'HUMIDITY',
        value: 20,
        min: -30,
        max: 500
      }
    ],
    colour: 20,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'soil_sensor_setup',
    lastDummyAlign0: 'RIGHT',
    message0: '%1 Soil Sensor Setup %2 Analog Pin# %3',
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
        type: 'field_dropdown',
        name: 'PIN',
        options: selectedBoard().analogPins
      }
    ],
    colour: 20,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'soil_humidity_percentage',
    message0: '%1 Soil humidity percentage',
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
    output: 'Number',
    colour: 20,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'soil_humidity_value',
    message0: '%1 Soil humidity value',
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
    output: 'Number',
    colour: 20,
    tooltip: '',
    helpUrl: ''
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
