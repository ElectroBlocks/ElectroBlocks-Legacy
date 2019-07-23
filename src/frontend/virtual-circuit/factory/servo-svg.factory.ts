import {  G, Parent, Element } from "svg.js";
import * as fs from "fs";
import * as path from "path";
import { ServoSvg } from "../svg/servo.svg";
import { ServoState } from "../../arduino/state/servo.state";
import {  virtualCircuitPin } from "../svg/arduino.svg";
import { VirtualCircuit } from "../svg/virtual-circuit";
import { createBreadboardWire, createGroundWire, createPowerWire } from "../svg/wire";

export const servoFactory = (virtualCircuit: VirtualCircuit,
                             componentState: ServoState) => {

	const servoString = fs.readFileSync(path.join(__dirname, '..','..','..','..', 'view', 'images', 'debug-mode', 'servo.svg')).toString();

	const servoSvg = new ServoSvg(virtualCircuit.baseSVG.svg(servoString).children().pop() as Parent, componentState.pin);

	virtualCircuit.nodes.add(servoSvg.svg);

	(servoSvg.svg as any).draggy();

	servoSvg.height("2.1in").move(300, 50);

	virtualCircuit.arduino.showWire(virtualCircuitPin(servoSvg.pin));

	createBreadboardWire(
		virtualCircuit,
		servoSvg,
		servoSvg.svg.select('#DATA_BOX').first() as Element,
		servoSvg.pin,
		'#FFA500'
	);

	createGroundWire(
		virtualCircuit,
		servoSvg,
		servoSvg.svg.select('#_5V_BOX').first() as Element
	);

	createPowerWire(
		virtualCircuit,
		servoSvg,
		servoSvg.svg.select('#GND_BOX').first() as Element
	);

	servoSvg.updateText();

	return servoSvg;
};




