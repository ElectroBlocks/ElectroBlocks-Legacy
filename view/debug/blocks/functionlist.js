let functionList = {
    variables_set_number,
    variables_get_number,


    math_number,
    math_arithmetic,
    math_round,
    math_modulo,
    math_random_int,

};

function newFrame() {
    return {
        variables: {}
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
