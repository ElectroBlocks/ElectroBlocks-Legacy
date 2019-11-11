import { ArduinoFrame } from '../arduino/arduino_frame';
import {
  generateFrameForInputStatement,
  getInputValue
} from '../frame/blockly_helper';
import { Variable } from '../frame/variable';
import { FrameLocation } from '../frame/frame';
import { Block } from 'blockly';
import * as Blockly from 'blockly/core';

export const procedures_callnoreturn_block = (
  block: Block | any,
  frameLocation: FrameLocation,
  previousFrame?: ArduinoFrame
) => {
  const frames = [];

  const procedureCall = block.getProcedureCall();
  const functionDefinitionBlock = findFunctionDefinitionBlock(procedureCall);

  const callMessage = `Calling user created function named ${procedureCall}.`;

  const callBlockFrame = previousFrame
    ? (previousFrame.makeCopy(
        block.id,
        frameLocation,
        callMessage
      ) as ArduinoFrame)
    : ArduinoFrame.makeEmptyFrame(block.id, frameLocation, callMessage);

  frames.push(callBlockFrame);

  const jumpMessage = `Jumping into function name ${procedureCall}.`;

  const definitionBlockFrame = new ArduinoFrame(
    functionDefinitionBlock.id,
    callBlockFrame.copyState(),
    frameLocation,
    jumpMessage
  );

  const procedureDefinition = mapProcedureDefinition(functionDefinitionBlock);
  const variableModels = procedureDefinition.variableModels;

  for (let i = 0; i < variableModels.length; i += 1) {
    const value = getInputValue(
      block,
      'ARG' + i,
      getVariableDefaultType(variableModels[i].type),
      frameLocation,
      previousFrame
    );

    definitionBlockFrame.state.variables[variableModels[i].name] = {
      name: variableModels[i].name,
      value,
      type: variableModels[i].type
    };
  }

  frames.push(definitionBlockFrame);

  const functionFrames = generateFrameForInputStatement(
    functionDefinitionBlock,
    'STACK',
    frameLocation,
    definitionBlockFrame
  );

  functionFrames.forEach((frame) => frames.push(frame));

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
  const functionBlocks = Blockly.mainWorkspace
    .getTopBlocks()
    .filter((block) => block.type === 'procedures_defnoreturn')
    .filter((block) => block.getProcedureDef()[0] === functionName);

  if (functionBlocks.length === 0) {
    throw new Error(`No block with that function name ${functionName} found.`);
  }

  return functionBlocks[0];
};

const mapProcedureDefinition = (
  block: Block | any
): { name: string; variableModels: Array<Variable> } => {
  const definition = block.getProcedureDef();
  const variableModels = definition[3];

  return {
    name: definition[0],
    variableModels
  };
};
