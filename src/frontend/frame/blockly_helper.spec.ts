import 'jasmine';
import { Block, Connection } from "./block";
import { frameGeneratingBlocks, valueGeneratingBlocks } from './frame_list';
import { Frame } from "./frame";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { generateFrameForInputStatement, getInputValue } from "./blockly_helper";
import { EmptyCommand } from "./command";

describe('generateFrameForInputStatement', () => {

	it ('should generate a list of frames from a input that contains blocks', () => {

		frameGeneratingBlocks['fake_generate_block'] = (block: Block, previousFrame?: Frame): Frame[] => {
			return [new ArduinoFrame('block_id', {}, [], new EmptyCommand())];
		};

		frameGeneratingBlocks['fake_generate_2_block'] = (block: Block, previousFrame?: Frame): Frame[] => {
			return [
				new ArduinoFrame('block_id', {}, [], new EmptyCommand()),
				new ArduinoFrame('block_id', {}, [], new EmptyCommand()),
			];
		};


		const block3: Block|any = {
			type: 'fake_generate',
			disabled: true,
		};

		const block2: Block|any = {
			type: 'fake_generate_2',
			disabled: false,
			nextConnection: {
				targetBlock(): Block {
					return block3
				}
			}
		};

		const block1: Block|any = {
			type: 'fake_generate',
			disabled: false,
			nextConnection: {
				targetBlock(): Block {
					return block2;
				}
			}
		};

		const topBlock: Block|any = {
			type: 'fake_generate',
			disabled: false,
			nextConnection: {
				targetBlock(): Block {
					return block1;
				}
			}
		};

		const containerBlock: Block|any = {
			getInputTargetBlock( statementName: string ): Block {
				return topBlock;
			}
		};

		const frames = generateFrameForInputStatement(containerBlock, 'start', null);

		expect(frames.length).toBe(4);
		expect(frames[0]).toEqual(jasmine.any(ArduinoFrame));
		expect(frames[1]).toEqual(jasmine.any(ArduinoFrame));
		expect(frames[2]).toEqual(jasmine.any(ArduinoFrame));
		expect(frames[3]).toEqual(jasmine.any(ArduinoFrame));
	});

	it('should get the input value from a block', () => {

		valueGeneratingBlocks['number_block'] = (block: Block, previousFrame?: Frame) => 4;

		const targetBlockContainingValue: Block|any = {
			type: 'number'
		};

		const parentBlock: Block|any = {
			getInput( inputName: string ): { connection: Connection } {
				return {
					connection: {
						getSourceBlock(): Block {
							return parentBlock;
						},
						targetBlock(): Block {
							return targetBlockContainingValue;
						}
					}
				}
			}
		};

		expect(getInputValue(parentBlock, 'VALUE', 0)).toBe(4);
	});

	it('should use default value if no blocks are attached', () => {

		const parentBlock: Block|any = {
			getInput( inputName: string ): { connection: Connection } {
				return {
					connection: {
						getSourceBlock(): Block {
							return parentBlock;
						},
						targetBlock(): Block {
							return null;
						}
					}
				}
			}
		};

		expect(getInputValue(parentBlock, 'VALUE', 0)).toBe(0);
	});


});
