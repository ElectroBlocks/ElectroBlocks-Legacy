let functionList = {
    variables_set_number_block,
    variables_get_number_block,
    variables_get_colour_block,
    variables_set_colour_block,
    variables_get_string_block,
    variables_set_string_block,
    variables_set_boolean_block,
    variables_get_boolean_block,

    logic_boolean_block,
    logic_compare_block,
    control_if_block,
    controls_ifelse_block,
    logic_operation_block,
    logic_negate_block,


    controls_repeat_ext_block,

    text_block,

    colour_picker_block,
    colour_random_block,
    colour_rgb_block,

    math_number_block,
    math_arithmetic_block,
    math_round_block,
    math_modulo_block,
    math_random_int_block,

};

function newFrame() {
    return {
        variables: {},
        blockId: null
    };
}

function copyFrame(frame) {

    let newVariablesList = {};

    for (let key in frame.variables){
        if (frame.variables.hasOwnProperty(key)) {
            newVariablesList[key] = frame.variables[key];
        }
    }

    return {
        variables: newVariablesList
    }
}
