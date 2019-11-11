import { ElectricComponentType } from './electric.component.type';
import { ARDUINO_UNO_PINS } from '../arduino_frame';
import * as _ from 'lodash';

export interface ElectricComponentState {
  readonly electricComponentType: ElectricComponentType;
}

export abstract class ElectricAttachmentComponentState
  implements ElectricComponentState {
  readonly pins: ARDUINO_UNO_PINS[] = [];
  abstract electricComponentType: ElectricComponentType;

  public copyState(): ElectricAttachmentComponentState {
    return _.cloneDeep(this);
  }

  public abstract isEqual(state: ElectricAttachmentComponentState): boolean;
}

export interface ExplainState {
  explanation(): string;
}

export abstract class SensorComponent extends ElectricAttachmentComponentState {
  public abstract readonly type;

  public abstract getFieldValue(dataKeySaveInSetupBlock: string): any;
}
