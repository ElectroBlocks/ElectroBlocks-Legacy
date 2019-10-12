import { defineBlocksWithJsonArray } from 'blockly';
import { selectedBoard } from '../types/pins';

defineBlocksWithJsonArray([
  {
    type: 'ultra_sonic_sensor_motion',
    message0: '%1 Ultra Sonic Sensor (Distance in cm)',
    args0: [
      {
        type: 'field_image',
        src: './assets/blocks/motion_sensor/ultrasonic_sensor.png',
        width: 30,
        height: 15,
        alt: '*',
        flipRtl: false
      }
    ],
    output: 'Number',
    colour: 230,
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'ultra_sonic_sensor_setup',
    message0: '%1 Setup Ultrasonic Sensor %2 TRIG %3 ECHO %4',
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
        type: 'field_dropdown',
        name: 'TRIG',
        options: selectedBoard().digitalPins
      },
      {
        type: 'field_dropdown',
        name: 'ECHO',
        options: selectedBoard().digitalPins
      }
    ],
    colour: 230,
    tooltip: '',
    helpUrl: ''
  }
]);
