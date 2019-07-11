import { Parent, Element } from "svg.js";
import { ARDUINO_UNO_PINS } from "../../arduino/pin";
import { BaseSvg } from "./base.svg";
import { ArduinoState } from "../../arduino/state/arduino.state";
import { ServoState } from "../../arduino/state/servo.state";
import { ElectricAttachmentComponentState } from "../../arduino/state/electric.state";

export class ServoSvg extends BaseSvg {

	private degree = 0;

	private rotateBoundBox = this.svg.select("#CenterOfCicle").first().bbox();

	constructor(public readonly svg: Parent, public readonly pin: ARDUINO_UNO_PINS, public wires: Element[]) {
		super();
	}

	public matchState( state: ArduinoState ): void {
		const servoState = state.components
			.filter(servo => servo instanceof ServoState)
			.find((servo: ServoState) => servo.pin == this.pin) as ServoState;

		if (servoState) {
			this.degree = servoState.degree;
			this.rotate();
			this.updateAngleText();
		}
	}

	isComponent( component: ElectricAttachmentComponentState): boolean {
		return component instanceof ServoState && component.pin == this.pin;
	}


	public shouldExist( state: ArduinoState ): boolean {
		const servoState = state.components
			.filter(servo => servo instanceof ServoState)
			.find((servo: ServoState) => servo.pin == this.pin) as ServoState;

		return servoState !== undefined;
	}

	public rotate() {
		this.svg
			.select('#moving_part')
			.first()
			.rotate(this.degree * -1, this.rotateBoundBox.x, this.rotateBoundBox.y);
	}

	public updateAngleText() {
		this.svg
			.select('#servo_name')
			.first()
			.node
			.textContent = `Servo ${this.pin}`;

		this.svg
			.select('#servo_degree')
			.first()
			.node
			.textContent = `${this.degree}˚`;
	}

	destroy(): void {
		this.wires.forEach(wire => {
			wire.remove();
		});

		this.svg.remove();
	}
}


