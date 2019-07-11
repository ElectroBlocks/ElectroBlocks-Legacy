import { Element } from 'svg.js';
import { VirtualCircuit } from "../virtual-circuit";

export const drawLineBetweenTwoNodes = (virtualCircuit: VirtualCircuit, svgA: Element, svgB: Element) => {

	svgB.fill("#AA0000");
	svgA.fill("#AA0000");

	const minusX =
		document.querySelector<HTMLDivElement>("#content-blocks").offsetWidth;
	const minusY =
		document.querySelector<HTMLDivElement>("#top-menu").offsetHeight;

	const boxA = svgA.node.getClientRects()[0] as any;

	const boxB = svgB.node.getClientRects()[0] as any;

	let p1x = boxA.x - minusX + (boxA.width / 2);

	let p1y = boxA.y - minusY + (boxA.height / 2);

	let p2x = boxB.x - minusX + (boxB.width / 2);

	let p2y = boxB.y - minusY + (boxB.height / 2);

	console.log(p1x, p1y, p2x, p2y, 'points');

	return drawLine(virtualCircuit, p1x, p1y, p2x, p2y);

};


const drawLine = (virtualCircuit: VirtualCircuit, p1x: number, p1y: number, p2x: number, p2y: number) => {
	if (virtualCircuit.zoom.transform) {
		const scaleX = virtualCircuit.zoom.transform.scaleX;
		const scaleY = virtualCircuit.zoom.transform.scaleY;

		const offsetX = virtualCircuit.zoom.transform.transformedX;
		const offsetY = virtualCircuit.zoom.transform.transformedY;

		p1x /= scaleX;
		p2x /= scaleX;

		p1y /= scaleY;
		p2y /= scaleY;

		p1x -= offsetX ;
		p2x -= offsetX ;

		p1y -= offsetY ;
		p2y -= offsetY ;


	}

	const line = virtualCircuit.baseSVG
		.line(0, 0, 0, 0)
		.stroke({width: 2, color: '#AA0000', opacity: .7})
		.front();

	console.log(line);

	virtualCircuit.nodes.add(line);

	line.plot(p1x, p1y, p2x, p2y);

	return line;
};
