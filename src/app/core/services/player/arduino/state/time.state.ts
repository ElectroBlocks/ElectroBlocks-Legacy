import {
  SensorComponent,
  ElectricAttachmentComponentState
} from './electric.state';
import { ElectricComponentType } from './electric.component.type';

export class TimeState extends SensorComponent {
  public type = 'time_component';

  public readonly electricComponentType = ElectricComponentType.TIME;

  constructor(public readonly timeInSeconds: number) {
    super();
  }

  public getFieldValue(dataKeySaveInSetupBlock: string) {
    return this.timeInSeconds.toFixed(5);
  }

  public isEqual(state: ElectricAttachmentComponentState): boolean {
    return state instanceof TimeState;
  }
}
