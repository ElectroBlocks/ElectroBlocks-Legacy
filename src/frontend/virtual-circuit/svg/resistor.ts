import { ComponentSvg } from "./component.svg";
import { Parent } from "svg.js";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";
import { ArduinoState } from "../../arduino/state/arduino.state";

export class Resistor extends ComponentSvg {

	constructor(public readonly svg: Parent, public readonly breadBoardHole: Parent, public  readonly invertY = false) {
		super( svg );
	}

	isComponent( component: ElectricAttachmentComponentState ): boolean {
		return false;
	}

	matchState( state: ArduinoState): void {

	}

	shouldExist( state: ArduinoState ): boolean {
		return true;
	}

	updateWires() {
		const { x, y } = this.breadBoardHole.ctm().extract();

		const innerX = this.breadBoardHole.cx();
		const innerY = this.breadBoardHole.cy();

		let yPosition = innerY + y - .75;

		if (this.invertY) {
			yPosition -= this.svg.height();
			yPosition += 1.5;
		}

		this.svg.move(innerX + x - (this.svg.width() / 2), yPosition);
	}


}
