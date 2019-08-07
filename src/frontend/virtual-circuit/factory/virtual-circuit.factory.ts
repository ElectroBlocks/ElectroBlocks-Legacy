import * as SVG from 'svg.js';
import { Parent } from 'svg.js';
import * as fs from "fs";
import * as path from "path";
import { ArduinoSvg } from "../svg/arduino.svg";
import { VirtualCircuit } from "../svg/virtual-circuit";

require( 'svg.pan-zoom.js' );
require( 'svg.draggy.js' );


let virtualCircuit: VirtualCircuit = null;

export const virtualCircuitFactory = () => {

	if (virtualCircuit) {
		return virtualCircuit;
	}

	const baseSVG: svgjs.Doc = SVG( 'virtual-circuit' );

	const nodes = baseSVG.group();

	const arduinoBreadboardString = fs.readFileSync( path.join( __dirname, '..', '..', '..', '..', 'view', 'images', 'debug-mode', 'arduino-breadboard-wired-1.svg' ) ).toString();

	const arduino = new ArduinoSvg( baseSVG.svg( arduinoBreadboardString ).children().pop() as Parent );

	nodes.add( arduino.svg );

	const zoom = (nodes as any).panZoom();
	(arduino.svg as any).draggy();

	arduino.move( 100, 210 );

	arduino.hidePinWires();

	virtualCircuit = new VirtualCircuit(baseSVG, nodes,  arduino, zoom);

	(window as any).virtualCircuit = virtualCircuit;

	return virtualCircuit;
};


