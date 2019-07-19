import { VirtualCircuit } from "../svg/virtual-circuit";
import { LedMatrixState } from "../../arduino/state/led_matrix.state";
import * as fs from "fs";
import * as path from "path";
import { Element, Parent } from "svg.js";
import { MatrixSvg } from "../svg/matrix.svg";
import { virtualCircuitPin } from "../svg/arduino.svg";
import { ARDUINO_UNO_PINS } from "../../arduino/pin";
import { createBreadboardWire, createGroundWire, createPowerWire } from "../svg/wire";

export const matrixFactory = (virtualCircuit: VirtualCircuit,
                              componentState: LedMatrixState) => {

	const matrixSvgString = fs.readFileSync( path.join( __dirname, '..', '..', '..', '..', 'view', 'images', 'debug-mode', 'matrix.svg' ) ).toString();

	const matrixSvg = new MatrixSvg(
		virtualCircuit.baseSVG.svg( matrixSvgString ).children().pop() as Parent
	);

	virtualCircuit.nodes.add(matrixSvg.svg);
	virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_12));
	virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_11));
	virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_10));

	matrixSvg.height("3.1in");

	createPowerWire(
		virtualCircuit,
		matrixSvg,
		matrixSvg.svg.select('#VCC').first() as Element);


	createGroundWire(
		virtualCircuit,
		matrixSvg,
		matrixSvg.svg.select('#GND').first() as Element);

	createBreadboardWire(
		virtualCircuit,
		matrixSvg,
		matrixSvg.svg.select('#DATA').first() as Element,
		ARDUINO_UNO_PINS.PIN_12,
		'#ff834b'
	);

	createBreadboardWire(
		virtualCircuit,
		matrixSvg,
		matrixSvg.svg.select('#CS').first() as Element,
		ARDUINO_UNO_PINS.PIN_10,
		'#6aa3ff'
	);

	createBreadboardWire(
		virtualCircuit,
		matrixSvg,
		matrixSvg.svg.select('#CLK').first() as Element,
		ARDUINO_UNO_PINS.PIN_11,
		'#ffe472'
	);



	(matrixSvg.svg as any).draggy();

	return matrixSvg;
};
