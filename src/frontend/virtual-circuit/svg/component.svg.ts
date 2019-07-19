import { BaseSvg } from "./base.svg";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { Wire } from "./wire";
import { Parent } from "svg.js";

export abstract class ComponentSvg extends BaseSvg{

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


	protected wires: Wire[] = [];

	public updateWires() {
		this.wires.forEach(wire => {
			wire.updateConnection()
		});
	}

	public addWire(wire: Wire) {
		this.wires.push(wire);
	}

	public abstract matchState(state: ArduinoState): void;

	public abstract shouldExist(state: ArduinoState): boolean;

	public abstract isComponent(component: ElectricAttachmentComponentState): boolean;

}
