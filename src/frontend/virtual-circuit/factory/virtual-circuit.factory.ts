import * as SVG from 'svg.js';
import * as fs from "fs";
import * as path from "path";
import { ArduinoSvg } from "../svg/arduino.svg";
import { Parent } from "svg.js";
import { VirtualCircuit } from "../virtual-circuit";

require( 'svg.pan-zoom.js' );
require( 'svg.draggy.js' );
require( 'svg.connectable.js' );

let virtualCircuit: VirtualCircuit = null;

export const virtualCircuitFactory = () => {

	if (virtualCircuit) {
		return virtualCircuit;
	}

	const baseSVG: svgjs.Doc = SVG( 'virtual-circuit' );

	const links = baseSVG.group();
	const markers = baseSVG.group();
	const nodes = baseSVG.group();

	console.log(nodes, 'nodes');


	const arduinoBreadboardString = fs.readFileSync( path.join( __dirname, '..', '..', '..', '..', 'view', 'images', 'debug-mode', 'arduino-breadboard-wired-copy.svg' ) ).toString();

	const arduino = new ArduinoSvg( baseSVG.svg( arduinoBreadboardString ).children().pop() as Parent );

	nodes.add( arduino.svg );

	const zoom = (nodes as any).panZoom();
	(arduino.svg as any).draggy();

	arduino.move( 100, 210 );

	arduino.hidePinWires();

	console.log(nodes, 'nodes object');

	virtualCircuit = new VirtualCircuit(baseSVG, nodes, links, markers, arduino, zoom);

	return virtualCircuit;
};


