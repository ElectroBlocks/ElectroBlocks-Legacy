import { Block, get_blockly } from "../frame/block";
import { ArduinoFrame } from "../arduino/arduino_frame";
import { generateFrameForInputStatement, getInputValue } from "../frame/blockly_helper";
import { Variable } from "../frame/variable";
import { FrameLocation } from "../frame/frame";

export const procedures_callnoreturn_block = (block: Block, frameLocation: FrameLocation,  previousFrame?: ArduinoFrame) => {

	let frames = [];

	let procedureCall = block.getProcedureCall();
	let functionDefinitionBlock = findFunctionDefinitionBlock(procedureCall);

	let callBlockFrame = previousFrame ?
		previousFrame.makeCopy(block.id, frameLocation) :
		ArduinoFrame.makeEmptyFrame(block.id, frameLocation);

	frames.push(callBlockFrame);

	const definitionBlockFrame = new ArduinoFrame(
		functionDefinitionBlock.id,
		callBlockFrame.variables,
		callBlockFrame.components,
		callBlockFrame.command,
		frameLocation
	);

	const procedureDefinition = mapProcedureDefinition(functionDefinitionBlock);
	const variableModels = procedureDefinition.variableModels;

	for (let i = 0; i < variableModels.length; i += 1) {
		let value =  getInputValue(
			block,
			'ARG' + i,
			getVariableDefaultType(variableModels[i].type),
			frameLocation,
			previousFrame,
		);

		definitionBlockFrame.variables[variableModels[i].name] = {
			name: variableModels[i].name,
			value,
			type: variableModels[i].type
		};
	}

	frames.push(definitionBlockFrame);

	let functionFrames = generateFrameForInputStatement(
		functionDefinitionBlock,
		'STACK',
		frameLocation,
		definitionBlockFrame
	);

	functionFrames.forEach(frame => frames.push(frame));

	return frames;
};

const getVariableDefaultType = (type: string) => {
	switch (type) {
		case 'Number':
			return 0;
		case 'String':
			return '';
		case 'Boolean':
			return true;
		case 'List String':
			return [''];
		case 'List Boolean':
			return [true];
		case 'List Number':
			return [0];
	}

	throw new Error('Unknown Type For Function Parameter');
};

const findFunctionDefinitionBlock = (functionName: string): Block => {
	let functionBlocks = get_blockly().mainWorkspace
		.getTopBlocks()
		.filter(block => block.type === 'procedures_defnoreturn')
		.filter(block => block.getProcedureDef()[0] == functionName);

	if (functionBlocks.length === 0) {
		throw new Error(`No block with that function name ${functionName} found.`);
	}

	return functionBlocks[0];
};

const mapProcedureDefinition = (block: Block): { "name" : string, variableModels: Array<Variable>} => {
	let definition =  block.getProcedureDef();
	const variableModels = definition[3];

	return {
		name: definition[0],
		variableModels
	};
};
