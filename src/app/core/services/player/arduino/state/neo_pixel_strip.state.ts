import { ElectricAttachmentComponentState, ElectricComponentState } from './electric.state';
import { Color } from '../../frame_genorator/color';
import { ARDUINO_UNO_PINS } from '../arduino_frame';
import { ElectricComponentType } from './electric.component.type';


export class NeoPixelStripState extends ElectricAttachmentComponentState  {


	public readonly electricComponentType = ElectricComponentType.NEO_PIXEL_STRIP;

	public readonly pins = [ this.analogPin ];

	constructor(
		public readonly numberOfLeds: number,
		public readonly analogPin: ARDUINO_UNO_PINS,
		public readonly neoPixels: Array<{ position: number, color: Color }>
	) {
		super();
	}

	public isEqual(state: ElectricAttachmentComponentState): boolean {
		return state instanceof NeoPixelStripState;
	}

}
