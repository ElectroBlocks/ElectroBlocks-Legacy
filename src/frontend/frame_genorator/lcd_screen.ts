import { Block } from "../frame/block";
import { FrameLocation } from "../frame/frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { LCD_SCREEN_MEMORY_TYPE, LCDScreen } from "../arduino/lcd_screen";
import { getInputValue } from "../frame/blockly_helper";
import { EmptyCommand } from "../frame/command";


export const lcd_setup_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const memoryType = block.getFieldValue('MEMORY_TYPE') as LCD_SCREEN_MEMORY_TYPE;

	const rows = parseInt(
		getInputValue(block, 'ROWS', 2, frameLocation, previousFrame) as string);

	const columns = parseInt(
		getInputValue(block, 'COLUMNS', 16, frameLocation, previousFrame) as string);

	const lcdComponent = new LCDScreen(memoryType, rows, columns);

	const components = previousFrame ? previousFrame.components : [];

	components.push(lcdComponent);

	const variables = previousFrame ? previousFrame.variables : {};

	return [
		new ArduinoFrame(block.id, variables, components, new EmptyCommand(), frameLocation)
	];
};

export const lcd_screen_print_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {
	
	const lcdScreen = previousFrame.components.find(component => component instanceof LCDScreen) as LCDScreen;

	const row = parseInt(getInputValue(block, 'ROW', 0, frameLocation, previousFrame).toString());
	const column = parseInt(getInputValue(block, 'COLUMN', 0, frameLocation, previousFrame).toString());
	const print = getInputValue(block, 'PRINT', '', frameLocation, previousFrame).toString();
	const command = lcdScreen.print(row, column, print);

	return [
		new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
	];
};

export const lcd_screen_simple_print_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const lcdScreen = previousFrame.components.find(component => component instanceof LCDScreen) as LCDScreen;

	const row1 = getInputValue(block, 'ROW_1', '',
		frameLocation,previousFrame).toString();

	const row2 = getInputValue(block, 'ROW_2', '',
		frameLocation,previousFrame).toString();

	const row3 = getInputValue(block, 'ROW_3', '',
		frameLocation,previousFrame).toString();

	const row4 = getInputValue(block, 'ROW_4', '',
		frameLocation,previousFrame).toString();

	const printCommand = lcdScreen.simplePrint([row1, row2, row3, row4]);

	return [
		new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, printCommand, frameLocation)
	];
};

export const lcd_screen_clear_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const lcdScreen = previousFrame.components.find(component => component instanceof LCDScreen) as LCDScreen;

	const command = lcdScreen.clear();


	return [
		new ArduinoFrame(block.id, previousFrame.variables, previousFrame.components, command, frameLocation)
	];
};

export const lcd_screen_blink_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const lcdScreen = previousFrame.components.find(component => component instanceof LCDScreen) as LCDScreen;

	const row =  parseInt(getInputValue(block, 'ROW', 0, frameLocation, previousFrame).toString());

	const column = parseInt(getInputValue(block, 'COLUMN', 0, frameLocation, previousFrame).toString());

	const isOn = block.getFieldValue('NAME') == 'BLINK';

	const command = lcdScreen.blinkCommandLCD(row, column, isOn);

	return [
		new ArduinoFrame(
			block.id,
			previousFrame.variables,
			previousFrame.components,
			command,
			frameLocation
		)
	];

};

export const lcd_backlight_block = (block: Block, frameLocation: FrameLocation, previousFrame?: ArduinoFrame): ArduinoFrame[] => {

	const lcdScreen = previousFrame.components.find(component => component instanceof LCDScreen) as LCDScreen;

	const isOn = block.getFieldValue('BACKLIGHT') == 'ON';

	const command = lcdScreen.toggleBackLight(isOn);

	return [
		new ArduinoFrame(
			block.id,
			previousFrame.variables,
			previousFrame.components,
			command,
			frameLocation
		)
	];
};

