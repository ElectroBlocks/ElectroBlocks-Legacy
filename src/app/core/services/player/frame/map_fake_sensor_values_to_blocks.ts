import { ElectricAttachmentComponentState } from '../arduino/state/electric.state';
import { RFIDState } from '../arduino/state/rfid.state';
import { ButtonState } from '../arduino/state/button.state';
import { Block } from 'blockly';
import { stringToPin, ARDUINO_UNO_PINS } from '../arduino/arduino_frame';
import { BluetoothState } from '../arduino/state/bluetooth.state';
import { ArduinoMessageState } from '../arduino/state/arduino-message.state';
import { loopTimes } from '../../blockly/block/debug_extensions';
import { PinState, PIN_TYPE, PinPicture } from '../arduino/state/pin.state';
import { IRRemoteState } from '../arduino/state/ir_remote.state';

export const mapFakeSensorValuesToBlocks: {
  [key: string]: SensorBlockMapper;
} = {
  ir_remote_setup_block: {
    type: 'ir_remote_component',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'scanned_new_code',
        sensorBlockType: 'ir_remote_has_code_receive',
        dataSaveKey: 'has_code',
        type: 'field_checkbox',
        defaultValue: false
      },
      {
        setupBlockFieldName: 'code',
        sensorBlockType: 'ir_remote_get_code',
        dataSaveKey: 'code',
        type: 'field_input',
        defaultValue: 'E932B'
      }
    ],
    convertToState(
      setupBlock: Block,
      serializedData: Array<{ has_code: boolean; code: string }>,
      loopNumber: number
    ) {
      const data = serializedData[loopNumber];
      const pin = stringToPin(setupBlock.getFieldValue('PIN'));

      return new IRRemoteState(data.has_code, data.code, pin);
    }
  },
  analog_read_setup_block: {
    type: 'any_pin_type_does_not_matter',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'power_level',
        sensorBlockType: 'analog_read',
        dataSaveKey: 'power_level',
        type: 'field_input',
        defaultValue: 12
      }
    ],
    convertToState(
      setupBlock: Block,
      serializedData: Array<{ power_level: number }>,
      loopNumber: number
    ) {
      const data = serializedData[loopNumber];
      const pin = stringToPin(setupBlock.getFieldValue('PIN'));
      return new PinState(
        pin,
        PIN_TYPE.ANALOG_INPUT,
        data.power_level,
        PinPicture.GENERIC
      );
    }
  },
  digital_read_setup_block: {
    type: 'any_pin_type_does_not_matter',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'has_power',
        sensorBlockType: 'digital_read',
        dataSaveKey: 'has_power',
        type: 'field_checkbox',
        defaultValue: false
      }
    ],
    convertToState(
      setupBlock: Block,
      serializedData: Array<{ has_power: boolean }>,
      loopNumber: number
    ) {
      const data = serializedData[loopNumber];
      const pin = stringToPin(setupBlock.getFieldValue('PIN'));

      return new PinState(
        pin,
        PIN_TYPE.DIGITAL_INPUT,
        data.has_power ? 1 : 0,
        PinPicture.GENERIC
      );
    }
  },
  push_button_setup_block: {
    type: 'button_component',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'is_pressed',
        sensorBlockType: 'is_button_pressed',
        dataSaveKey: 'button_pressed',
        type: 'field_checkbox',
        defaultValue: false
      }
    ],
    convertToState(
      setupBlock: Block,
      listOfInput: Array<{ button_pressed: boolean }>,
      loopNumber: number
    ) {
      const pin =
        stringToPin(setupBlock.getFieldValue('PIN')) || ARDUINO_UNO_PINS.PIN_7;

      if (!listOfInput) {
        return new ButtonState(pin, false);
      }

      const data = listOfInput[loopNumber];

      return new ButtonState(pin, data.button_pressed);
    }
  },
  time_setup_block: {
    type: 'time_component',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'time_in_seconds',
        sensorBlockType: 'time_seconds',
        dataSaveKey: 'time_in_seconds',
        type: 'field_input',
        defaultValue: false
      }
    ],
    convertToState(
      setupBlock: Block,
      listOfInput: Array<{
        time: number;
      }>,
      loopNumber: number
    ) {
      throw new Error('This should be set manually');
    }
  },
  bluetooth_setup_block: {
    type: 'bluetooth_component',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'receiving_message',
        sensorBlockType: 'bluetooth_has_message',
        dataSaveKey: 'receiving_message',
        type: 'field_checkbox',
        defaultValue: false
      },
      {
        setupBlockFieldName: 'message',
        sensorBlockType: 'bluetooth_get_message',
        dataSaveKey: 'message',
        type: 'field_input',
        defaultValue: ''
      }
    ],
    convertToState(
      setupBlock: Block,
      listOfInput: Array<{
        receiving_message: boolean;
        message: string;
      }>,
      loopNumber: number
    ) {
      const rxPin = stringToPin(setupBlock.getFieldValue('RX'));
      const txPin = stringToPin(setupBlock.getFieldValue('TX'));

      if (!listOfInput) {
        return new BluetoothState(rxPin, txPin, false, '', '');
      }

      const data = listOfInput[loopNumber];

      return new BluetoothState(
        rxPin,
        txPin,
        data.receiving_message,
        data.message,
        ''
      );
    }
  },
  message_setup_block: {
    type: 'arduino_message_component',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'receiving_message',
        sensorBlockType: 'arduino_receive_message',
        dataSaveKey: 'receiving_message',
        type: 'field_checkbox',
        defaultValue: false
      },
      {
        setupBlockFieldName: 'message',
        sensorBlockType: 'arduino_get_message',
        dataSaveKey: 'message',
        type: 'field_input',
        defaultValue: ''
      }
    ],
    convertToState(
      block: Block,
      listOfInput: Array<{
        receiving_message: boolean;
        message: string;
      }>,
      loopNumber: number
    ) {
      const data = listOfInput[loopNumber];

      return new ArduinoMessageState(data.receiving_message, data.message);
    }
  },
  rfid_setup_block: {
    type: 'rfid_component',
    fieldsToCollect: [
      {
        setupBlockFieldName: 'scanned_card',
        sensorBlockType: 'rfid_scan',
        dataSaveKey: 'scanned_card',
        type: 'field_checkbox',
        defaultValue: false
      },
      {
        setupBlockFieldName: 'card_number',
        sensorBlockType: 'rfid_card',
        dataSaveKey: 'card_number',
        defaultValue: 'card',
        type: 'field_input'
      },
      {
        setupBlockFieldName: 'tag',
        sensorBlockType: 'rfid_tag',
        dataSaveKey: 'tag',
        defaultValue: 'tag',
        type: 'field_input'
      }
    ],
    convertToState(
      setupBlock: Block,
      listOfInput: Array<{
        tag: string;
        card_number: string;
        scanned_card: boolean;
      }>,
      loopNumber: number
    ) {
      const rxPin =
        stringToPin(setupBlock.getFieldValue('RX')) || ARDUINO_UNO_PINS.PIN_7;
      const txPin =
        stringToPin(setupBlock.getFieldValue('TX')) || ARDUINO_UNO_PINS.PIN_6;

      if (!listOfInput) {
        return new RFIDState(rxPin, txPin, false, '', '');
      }
      const data = listOfInput[loopNumber];

      return new RFIDState(
        rxPin,
        txPin,
        data.scanned_card,
        data.card_number,
        data.tag
      );
    }
  }
};

export interface FakeInputMap {
  setupBlockFieldName: string;
  sensorBlockType: string;
  dataSaveKey: string;
  type: string;
  defaultValue: any;
}

export interface SensorBlockMapper {
  fieldsToCollect: Array<FakeInputMap>;
  type: string;
  convertToState: (
    block: Block,
    serializedData: any[],
    loopNumber: number
  ) => ElectricAttachmentComponentState;
}
