import {  G, Parent, Element } from "svg.js";
import * as fs from "fs";
import * as path from "path";
import { ServoSvg } from "../svg/servo.svg";
import { ServoState } from "../../arduino/state/servo.state";
import { connectionToBreadboard, virtualCircuitPin } from "../svg/arduino.svg";
import { VirtualCircuit } from "../virtual-circuit";

export const servoFactory = (virtualCircuit: VirtualCircuit,
                             componentState: ServoState) => {

	const servoString = fs.readFileSync(path.join(__dirname, '..','..','..','..', 'view', 'images', 'debug-mode', 'servo-1.svg')).toString();

	const servoSvg = new ServoSvg(virtualCircuit.baseSVG.svg(servoString).children().pop() as Parent, componentState.pin, []);



	virtualCircuit.nodes.add(servoSvg.svg);

	(servoSvg.svg as any).draggy();

	servoSvg.height("2.1in").move(10, 200);

	virtualCircuit.arduino.showWire(virtualCircuitPin(servoSvg.pin));

	console.log(servoSvg.svg.select('#DATA_BOX').first());


	return servoSvg;
};
