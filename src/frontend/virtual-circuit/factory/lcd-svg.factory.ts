import { VirtualCircuit } from "../svg/virtual-circuit";
import { LCDScreenState } from "../../arduino/state/lcd_screen.state";
import * as fs from "fs";
import * as path from "path";
import { Parent } from "svg.js";
import { LcdSvg } from "../svg/lcd.svg";

export const lcdFactory = (virtualCircuit: VirtualCircuit, lcdState: LCDScreenState) => {

	let lcdString = fs.readFileSync( path.join( __dirname, '..', '..', '..', '..', 'view', 'images', 'debug-mode', 'lcd.svg' ) ).toString();



	const lcdSvg = new LcdSvg(
		virtualCircuit.baseSVG.svg( lcdString ).children().pop() as Parent,
		lcdState.columns,
		lcdState.rows
	);

	virtualCircuit.nodes.add(lcdSvg.svg);
	(lcdSvg.svg as any).draggy();

	return lcdSvg;
};
