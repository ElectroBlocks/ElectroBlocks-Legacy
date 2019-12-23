import { VirtualCircuit } from '../svg/virtual-circuit';
import { Doc } from 'svg.js';
import { VariablesSvg } from '../svg/variables.svg';

export const variableSvgFactory = (virtualCircuit: VirtualCircuit) => {
  const variablesSvg = new VariablesSvg(virtualCircuit.baseSVG as svgjs.Doc);

  (variablesSvg.textGroup as any).draggy();

  variablesSvg.move(30, 50);
  variablesSvg.createTitle();
  (window as any).variablesSvg = variablesSvg;
  return variablesSvg;
};
