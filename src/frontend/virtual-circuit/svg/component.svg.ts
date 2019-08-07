import { BaseSvg } from "./base.svg";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { Line } from "./wire";
import { Parent } from "svg.js";

export abstract class ComponentSvg extends BaseSvg {

	protected wires: Line[] = [];

	protected constructor(public readonly svg: Parent ) {
		super(svg);
		this.svg.on("dragstart", () => {
			this.updateWires();
		});

		this.svg.on("dragmove", () => {
			this.updateWires();
		});

		this.svg.on("dragend", () => {
			this.updateWires();
		});
	}

	public updateWires() {
		this.wires.forEach(wire => {
			wire.updateConnection()
		});
	}

	public addWire(wire: Line) {
		this.wires.push(wire);
	}


	public remove(): void {
		this.svg.remove();

		this.wires.forEach(wire => {
			wire.destroyWire();
		});
	}

	public abstract matchState(state: ArduinoState): void;

	public abstract shouldExist(state: ArduinoState): boolean;

	public abstract isComponent(component: ElectricAttachmentComponentState): boolean;

}
