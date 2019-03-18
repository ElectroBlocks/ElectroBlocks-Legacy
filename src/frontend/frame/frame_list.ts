import { Frame } from './frame';
import { Block } from './block';
import { 
    variables_set_boolean_block,
    variables_set_string_block,
    variables_set_colour_block,
    variables_set_number_block,

    variables_get_boolean_block,
    variables_get_string_block,
    variables_get_colour_block,
    variables_get_number_block,
} from '../frame_genorator/variables';

import {
    math_arithmetic_block,
    math_round_block,
    math_number_block,
    math_random_int_block,
    math_modulo_block,
    string_to_number_block,
} from "../frame_genorator/math";

import {
    colour_random_block,
    colour_picker_block,
    colour_rgb_block,
    Color
} from '../frame_genorator/colour';


let valueGeneratingBlocks: { [key: string] : (block: Block, previousFrame?: Frame) =>  number|string|boolean|Color|Array<number|string|boolean|Color> };

let frameGeneratingBlocks: { [key: string] : (block: Block, previousFrame?: Frame) =>  Frame[] };

frameGeneratingBlocks = {
    variables_set_boolean_block,
    variables_set_string_block,
    variables_set_colour_block,
    variables_set_number_block,
};

valueGeneratingBlocks = {
    variables_get_boolean_block,
    variables_get_string_block,
    variables_get_colour_block,
    variables_get_number_block,

    math_arithmetic_block,
    math_round_block,
    math_number_block,
    math_random_int_block,
    math_modulo_block,
    string_to_number_block,

    colour_random_block,
    colour_picker_block,
    colour_rgb_block
};

export {
    frameGeneratingBlocks,
    valueGeneratingBlocks
};
