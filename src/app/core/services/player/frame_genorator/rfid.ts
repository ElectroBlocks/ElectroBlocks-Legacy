import { BlocklyService } from './../../blockly.service';
import { ArduinoState } from './../arduino/state/arduino.state';
import { Block } from 'blockly';
import { FrameLocation } from './../frame/frame';
import { ArduinoFrame } from './../arduino/arduino_frame';
import { RFIDState } from '../arduino/state/rfid.state';
import { getSensorData } from '../frame/generate_frame';

export const rfid_card_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {

  return getRFIDComponent(frameLocation).cardNumber;
};

export const rfid_scan_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  return getRFIDComponent(frameLocation).scannedCard;
}

export const rfid_tag_block = (
  block: Block,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  return getRFIDComponent(frameLocation).tag;
}

const getRFIDComponent = (frameLocation: FrameLocation): RFIDState => {
  const data = getSensorData();
  const loopNumber = frameLocation.iteration;
  return data[loopNumber].find(
    component => component instanceof RFIDState
  ) as RFIDState;
}