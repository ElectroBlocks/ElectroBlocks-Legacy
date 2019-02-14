var functionList = {
    variables_set_number,
    variables_get_number,
    math_number,
    math_arithmetic,
};

function newFrame() {
    return {
        variables: {}
    };
}

function copyFrame(frame) {

    var newVariablesList = {};

    for (var key in frame.variables){
        if (frame.variables.hasOwnProperty(key)) {
            newVariablesList[key] = frame.variables[key];
        }
    }

    return {
        variables: newVariablesList
    }
}
