import { ElectricAttachmentComponentState, ElectricComponentState } from "./electric.state";
import { Color } from "../../frame_genorator/colour";
import { ARDUINO_UNO_PINS } from "../pin";
import { ElectricComponentType } from "./electric.component.type";


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

}
