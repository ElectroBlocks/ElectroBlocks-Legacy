"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const variables_1 = require("../frame_genorator/variables");
let valueGeneratingBlocks;
exports.valueGeneratingBlocks = valueGeneratingBlocks;
let frameGeneratingBlocks;
exports.frameGeneratingBlocks = frameGeneratingBlocks;
exports.frameGeneratingBlocks = frameGeneratingBlocks = {
    variables_set_boolean_block: variables_1.variables_set_boolean_block,
    variables_set_string_block: variables_1.variables_set_string_block,
    variables_set_colour_block: variables_1.variables_set_colour_block,
    variables_set_number_block: variables_1.variables_set_number_block,
};
exports.valueGeneratingBlocks = valueGeneratingBlocks = {
    variables_get_boolean_block: variables_1.variables_get_boolean_block,
    variables_get_string_block: variables_1.variables_get_string_block,
    variables_get_colour_block: variables_1.variables_get_colour_block,
    variables_get_number_block: variables_1.variables_get_number_block,
};
//# sourceMappingURL=frame_list.js.map