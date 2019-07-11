import { ElectricComponentType } from "./electric.component.type";
import { ARDUINO_UNO_PINS } from "../pin";
import * as _ from "lodash";

export interface ElectricComponentState {

	readonly electricComponentType: ElectricComponentType;

}

export abstract class ElectricAttachmentComponentState implements ElectricComponentState {

	readonly pins: ARDUINO_UNO_PINS[];

	abstract electricComponentType: ElectricComponentType;

	public copyState(): ElectricAttachmentComponentState {
		return _.cloneDeep(this);
	}
}




