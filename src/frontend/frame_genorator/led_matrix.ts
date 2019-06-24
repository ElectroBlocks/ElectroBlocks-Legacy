import { FrameLocation } from "../frame/frame";
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { LedMatrix, LedInMatrix } from "../arduino/led_matrix";
import { getInputValue } from "../frame/blockly_helper";


const hasLedMatrix = ( previousFrame?: ArduinoFrame ) => {

	if (!previousFrame) {
		return false;
	}

	return previousFrame
		.components
		.filter( component => component instanceof LedMatrix ).length !== 0;

};

export const led_matrix_make_draw_block = ( block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame ): ArduinoFrame[] => {

	const ledMatrixComponent = hasLedMatrix( previousFrame ) ?
		previousFrame.components.find( component => component instanceof LedMatrix ) as LedMatrix : new LedMatrix();

	block.inputList
		.filter( input => input.fieldRow.length > 1 ) // filters out the non matrix row
		.forEach( input => {
			input.fieldRow.forEach( ( field: { name: string, state_: boolean } ) => {
				const row = parseInt( field.name.split( ',' )[ 0 ] );
				const column = parseInt( field.name.split( ',' )[ 1 ] );
				const isOn = field.state_;

				ledMatrixComponent.setLed( new LedInMatrix( isOn, column, row ) );
			} );
		} );

	const variables = previousFrame ? previousFrame.variables : {};
	const components = hasLedMatrix( previousFrame ) ?
		previousFrame.components : [ ledMatrixComponent ];

	return [
		new ArduinoFrame(
			block.id,
			variables,
			components,
			ledMatrixComponent.usbCommand(),
			frameLocation
		)
	];
};

export const led_matrix_turn_one_on_off_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const ledMatrixComponent = hasLedMatrix( previousFrame ) ?
		previousFrame.components.find( component => component instanceof LedMatrix ) as LedMatrix : new LedMatrix();

	const isOn = block.getFieldValue('STATE') === 'ON';
	const row = parseInt(getInputValue(block, 'ROW', 1, frameLocation,previousFrame).toString()) - 1;
	const column = parseInt(getInputValue(block, 'COLUMN', 1, frameLocation, previousFrame).toString()) - 1;



	ledMatrixComponent.setLed( new LedInMatrix( isOn, column, row ) );

	const variables = previousFrame ? previousFrame.variables : {};
	const components = hasLedMatrix( previousFrame ) ?
		previousFrame.components : [ ledMatrixComponent ];


	return [
		new ArduinoFrame(block.id, variables, components, ledMatrixComponent.usbCommand(), frameLocation)
	];
};
