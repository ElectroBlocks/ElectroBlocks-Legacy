import { VirtualCircuit } from "../svg/virtual-circuit";
import { LCDScreenState } from "../../arduino/state/lcd_screen.state";
import * as fs from "fs";
import * as path from "path";
import { Element, Parent } from "svg.js";
import { LcdSvg } from "../svg/lcd.svg";
import { createBreadboardWire, createGroundWire, createPowerWire } from "../svg/wire";
import { ARDUINO_UNO_PINS } from "../../arduino/arduino_frame";
import { virtualCircuitPin } from "../svg/arduino.svg";

export const lcdFactory = (virtualCircuit: VirtualCircuit, lcdState: LCDScreenState) => {

	let lcdString = fs.readFileSync( path.join( __dirname, '..', '..', '..', '..', 'view', 'images', 'debug-mode', 'lcd.svg' ) ).toString();



	const lcdSvg = new LcdSvg(
		virtualCircuit.baseSVG.svg( lcdString ).children().pop() as Parent,
		lcdState.columns,
		lcdState.rows
	);

	createPowerWire(
		virtualCircuit,
		lcdSvg,
		lcdSvg.svg.select('#VCC_CONNECT').first() as Element
	);

	const [positionX, positionY] = createGroundWire(
		virtualCircuit,
		lcdSvg,
		lcdSvg.svg.select('#GND_CONNECT').first() as Element,
	);

	createBreadboardWire(
		virtualCircuit,
		lcdSvg,
		lcdSvg.svg.select('#SDA_CONNECT').first() as Element,
		ARDUINO_UNO_PINS.PIN_A4,
		'#F15A24'
	);

	 createBreadboardWire(
		virtualCircuit,
		lcdSvg,
		lcdSvg.svg.select('#SCL_CONNECT').first() as Element,
		ARDUINO_UNO_PINS.PIN_A5,
		'#FF00FF'
	).getHoleXY();

	virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_A5));
	virtualCircuit.arduino.showWire(virtualCircuitPin(ARDUINO_UNO_PINS.PIN_A4));

	virtualCircuit.nodes.add(lcdSvg.svg);
	(lcdSvg.svg as any).draggy();

	lcdSvg.move(positionX - 30, positionY - 300);
	lcdSvg.updateWires();
	return lcdSvg;
};
