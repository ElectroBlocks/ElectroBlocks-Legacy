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

import {
    get_colour_from_list_block,
    get_boolean_from_list_block,
    get_number_from_list_block,
    get_string_from_list_block,
    set_boolean_list_block_block,
    set_colour_list_block_block,
    set_number_list_block_block,
    set_string_list_block_block,
    create_list_boolean_block_block,
    create_list_colour_block_block,
    create_list_number_block_block,
    create_list_string_block_block

} from '../frame_genorator/list';

import {
    logic_boolean_block,
    logic_compare_block,
    logic_negate_block,
    logic_operation_block,
    control_if_block,
    controls_ifelse_block
} from  '../frame_genorator/logic';

import {
    controls_for_block,
    controls_repeat_ext_block
} from '../frame_genorator/loops';

import { procedures_callnoreturn_block } from '../frame_genorator/function';

import {
    text_block,
    text_changeCase_block,
    text_isEmpty_block,
    text_join_block,
    text_length_block,
    number_to_string_block,
    parse_string_block_block
} from  '../frame_genorator/text';

let valueGeneratingBlocks: { [key: string] : (block: Block, previousFrame?: Frame) =>  number|string|boolean|Color|Array<number|string|boolean|Color> };

let frameGeneratingBlocks: { [key: string] : (block: Block, previousFrame?: Frame) =>  Frame[] };

frameGeneratingBlocks = {
    variables_set_boolean_block,
    variables_set_string_block,
    variables_set_colour_block,
    variables_set_number_block,

    procedures_callnoreturn_block,

    set_boolean_list_block_block,
    set_colour_list_block_block,
    set_number_list_block_block,
    set_string_list_block_block,

    create_list_boolean_block_block,
    create_list_colour_block_block,
    create_list_number_block_block,
    create_list_string_block_block,

    control_if_block,
    controls_ifelse_block,

    controls_for_block,
    controls_repeat_ext_block
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
    colour_rgb_block,

    get_colour_from_list_block,
    get_boolean_from_list_block,
    get_number_from_list_block,
    get_string_from_list_block,

    logic_boolean_block,
    logic_compare_block,
    logic_negate_block,
    logic_operation_block,

    text_block,
    text_changeCase_block,
    text_isEmpty_block,
    text_join_block,
    text_length_block,
    number_to_string_block,
    parse_string_block_block
};

export {
    frameGeneratingBlocks,
    valueGeneratingBlocks
};
