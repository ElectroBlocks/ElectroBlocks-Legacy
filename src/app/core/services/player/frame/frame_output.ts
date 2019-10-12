import { FrameLocation } from './frame';
import { ArduinoState } from '../arduino/state/arduino.state';

export interface FrameOutput {
  frameNumber: number;
  state: ArduinoState;
  frameLocation: FrameLocation;
  lastFrame: boolean;
  blockId: string;
}
