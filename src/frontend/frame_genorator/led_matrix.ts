import { FrameLocation } from "../frame/frame";
import { Block } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { getInputValue } from "../frame/blockly_helper";
import { LedMatrixState } from "../arduino/state/led_matrix.state";
import { ArduinoState } from "../arduino/state/arduino.state";
import { ActionType } from "../frame/action.type";


const hasLedMatrix = ( previousFrame?: ArduinoFrame ) => {

	if (!previousFrame) {
		return false;
	}

	return previousFrame
		.state
		.components
		.filter( component => component instanceof LedMatrixState ).length !== 0;

};

export const led_matrix_make_draw_block = ( block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame ): ArduinoFrame[] => {

	const state = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

	const ledMatrixComponent = hasLedMatrix( previousFrame ) ?
		state.components.find( component => component instanceof LedMatrixState ) as LedMatrixState : new LedMatrixState([]);

	block.inputList
		.filter( input => input.fieldRow.length > 1 ) // filters out the non matrix row
		.forEach( input => {
			input.fieldRow.forEach( ( field: { name: string, state_: boolean } ) => {
				const row = parseInt( field.name.split( ',' )[ 0 ] );
				const column = parseInt( field.name.split( ',' )[ 1 ] );
				const isOn = field.state_;

				ledMatrixComponent.leds.push( { row, col: column, isOn });
			} );
		} );

	if (!state.components.includes(ledMatrixComponent)) {
		state.components.push(ledMatrixComponent);
	}

	return [
		new ArduinoFrame(
			block.id,
			state,
			frameLocation,
			ActionType.LED_MATRIX_DRAW
		)
	];
};

export const led_matrix_turn_one_on_off_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const state = previousFrame ? previousFrame.copyState() : ArduinoState.makeEmptyState();

	const ledMatrixComponent = hasLedMatrix( previousFrame ) ?
		state.components.find( component => component instanceof LedMatrixState ) as LedMatrixState : new LedMatrixState([]);

	const isOn = block.getFieldValue('STATE') === 'ON';
	const row = parseInt(getInputValue(block, 'ROW', 1, frameLocation,previousFrame).toString()) - 1;
	const column = parseInt(getInputValue(block, 'COLUMN', 1, frameLocation, previousFrame).toString()) - 1;

	const index = ledMatrixComponent.leds.findIndex(led => led.col == column && led.row == row);

	if (!index) {
		ledMatrixComponent.leds.push({ row, col: column, isOn });
	} else {
		ledMatrixComponent.leds[index].isOn = isOn;
	}

	return [
		new ArduinoFrame(
			block.id,
			state,
			frameLocation,
			ActionType.LED_MATRIX_DRAW
		)
	];
};
