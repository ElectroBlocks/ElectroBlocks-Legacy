import { ArduinoSvg } from "./svg/arduino.svg";
import { BaseSvg } from "./svg/base.svg";
import { ArduinoState } from "../arduino/state/arduino.state";
import { ElectricAttachmentComponentState } from "../arduino/state/electric.state";
import { G } from "svg.js";
import { servoFactory } from "./factory/servo-svg.factory";
import { ServoState } from "../arduino/state/servo.state";


export class VirtualCircuit {

	private svgs: BaseSvg[] = [];

	constructor( public readonly baseSVG: svgjs.Doc,
	             public readonly nodes: G,
	             public readonly links: G,
	             public readonly markers: G,
	             public readonly arduino: ArduinoSvg,
	             public readonly zoom: {
		             transform?:
			             {
				             scaleX: number,
				             scaleY: number,
				             transformedX: number,
				             transformedY: number
			             }
	             } ) {

	}

	public matchState( state: ArduinoState ) {
		this.arduino.matchState( state );

		this.svgs.forEach( ( svg ) => {
			svg.matchState( state );
		} );
	}

	matchFinalState( state: ArduinoState ) {
		this.svgs.forEach( ( svg ) => {
			if (!svg.shouldExist( state )) {
				svg.remove();
				this.svgs = this.svgs.filter( svgCompare => svgCompare !== svg );
			}
		} );

		state.components.forEach( component => {
			const doesComponentExist = this
				.svgs
				.filter( svg => svg.isComponent( component ) )
				.length > 0;

			if (!doesComponentExist) {
				this.createComponent( component );
			}
		} );
	}

	createComponent( component: ElectricAttachmentComponentState ) {
		if (component instanceof ServoState) {
			this.svgs.push( servoFactory( this, component ) );
			return;
		}
	}

}




