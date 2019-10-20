import { VirtualCircuit } from '../svg/virtual-circuit';
import { MotorSvg } from '../svg/motor.svg';
import { fetchSVGXMLData } from './fetch.svg';
import { Parent } from 'svg.js';
import { MotorState } from '../../player/arduino/state/motor.state';



export const motorFactory = async (
         virtualCircuit: VirtualCircuit,
         componentState: MotorState,
         componentOnly = false
       ) => {
         const motorSvgString = `./assets/svgs/motor.svg`;

         const motorSvg = new MotorSvg(
           virtualCircuit.baseSVG
             .svg(await fetchSVGXMLData(motorSvgString))
             .children()
             .pop() as Parent,
           componentState
         );
        motorSvg.svg.size(500, 300);

         virtualCircuit.nodes.add(motorSvg.svg);
         (motorSvg.svg as any).draggy();

         return motorSvg;
       };