import { Block } from 'blockly';
import { FrameLocation } from './frame';
import { ElectricAttachmentComponentState } from '../arduino/state/electric.state';

export enum INPUT_STATE_TYPES {
  RFID_TAG = 'RFID_TAG',
  RFID_NUMBER = 'RFID_NUMBER'
}

class InputStateHolder {
  private inputStates: InputState[] = [];

  getStatementBlock(block: Block): Block {
    while (block.getParent().nextConnection == null) {
      block = block.getParent();
    }

    return block;
  }

  addState(
    value: any,
    block: Block,
    component: ElectricAttachmentComponentState,
    frameLocation: FrameLocation
  ) {
    const statementBlock = this.getStatementBlock(block);

    const index = this.inputStates.findIndex(input => {
      return (
        statementBlock.id == input.block.id &&
        component.isEqual(input.component) &&
        input.frameLocation.iteration == frameLocation.iteration &&
        input.frameLocation.location == frameLocation.location
      );
    });

    const inputState: InputState = {
      value,
      component,
      frameLocation,
      block: statementBlock
    };
    if (index > -1) {
      this.inputStates[index] = inputState;
      return;
    }

    this.inputStates.push(inputState);
  }

  getStateList() {
    return this.inputStates;
  }

  clearState() {
    this.inputStates = [];
  }
}

export interface InputState {
  value: any;

  component: ElectricAttachmentComponentState;

  frameLocation: FrameLocation;

  block: Block;
}

export const inputStateHolder = new InputStateHolder();
