import { Parent } from "svg.js";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";


export abstract class BaseSvg {
	public readonly svg: Parent;

	move(x: number, y: number) {
		this.svg.move(x, y);

		return this;
	}

	height(size: string) {
		this.svg.height(size);

		return this;
	}

	remove() {
		this.svg.remove();
	}

	public abstract matchState(state: ArduinoState): void;

	public abstract shouldExist(state: ArduinoState): boolean;

	public abstract isComponent(component: ElectricAttachmentComponentState): boolean;

	public abstract destroy(): void;

}
