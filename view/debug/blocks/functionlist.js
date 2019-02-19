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
    controls_for_block,

    text_block,
    text_join_block,
    text_length_block,

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

    Object
        .keys(frame.variables)
        .forEach(function(key) {
            newVariablesList[key] = {};
            newVariablesList[key].value = frame.variables[key].value;
            newVariablesList[key].name = frame.variables[key].name;
            newVariablesList[key].type = frame.variables[key].type;
        }) ;

    return {
        variables: newVariablesList,
        blockId: frame.hasOwnProperty('blockId') ? frame.blockId : null
    }
}
