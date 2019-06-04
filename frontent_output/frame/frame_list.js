"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const input_output_1 = require("../frame_genorator/input_output");
const time_1 = require("../frame_genorator/time");
const servo_1 = require("../frame_genorator/servo");
const motor_1 = require("../frame_genorator/motor");
const debug_1 = require("../frame_genorator/debug");
const pass_through_block_1 = require("../frame_genorator/pass_through_block");
const led_matrix_1 = require("../frame_genorator/led_matrix");
const neo_pixel_1 = require("../frame_genorator/neo-pixel");
const lcd_screen_1 = require("../frame_genorator/lcd_screen");
const variables_1 = require("../frame_genorator/variables");
const math_1 = require("../frame_genorator/math");
const message_1 = require("../frame_genorator/message");
const colour_1 = require("../frame_genorator/colour");
const list_1 = require("../frame_genorator/list");
const logic_1 = require("../frame_genorator/logic");
const loops_1 = require("../frame_genorator/loops");
const function_1 = require("../frame_genorator/function");
const text_1 = require("../frame_genorator/text");
let valueGeneratingBlocks;
exports.valueGeneratingBlocks = valueGeneratingBlocks;
let frameGeneratingBlocks;
exports.frameGeneratingBlocks = frameGeneratingBlocks;
exports.frameGeneratingBlocks = frameGeneratingBlocks = {
    variables_set_boolean_block: variables_1.variables_set_boolean_block,
    variables_set_string_block: variables_1.variables_set_string_block,
    variables_set_colour_block: variables_1.variables_set_colour_block,
    variables_set_number_block: variables_1.variables_set_number_block,
    procedures_callnoreturn_block: function_1.procedures_callnoreturn_block,
    set_boolean_list_block_block: list_1.set_boolean_list_block_block,
    set_colour_list_block_block: list_1.set_colour_list_block_block,
    set_number_list_block_block: list_1.set_number_list_block_block,
    set_string_list_block_block: list_1.set_string_list_block_block,
    create_list_boolean_block_block: list_1.create_list_boolean_block_block,
    create_list_colour_block_block: list_1.create_list_colour_block_block,
    create_list_number_block_block: list_1.create_list_number_block_block,
    create_list_string_block_block: list_1.create_list_string_block_block,
    control_if_block: logic_1.control_if_block,
    controls_ifelse_block: logic_1.controls_ifelse_block,
    controls_for_block: loops_1.controls_for_block,
    controls_repeat_ext_block: loops_1.controls_repeat_ext_block,
    digital_write_block: input_output_1.digital_write_block,
    analog_write_block: input_output_1.analog_write_block,
    delay_block_block: time_1.delay_block_block,
    send_message_block: message_1.send_message_block,
    bt_send_message_block: message_1.bt_send_message_block,
    servo_move_block: servo_1.servo_move_block,
    move_motor_block: motor_1.move_motor_block,
    debug_block: debug_1.debug_block,
    neo_pixel_set_color_block: neo_pixel_1.neo_pixel_set_color_block,
    neo_pixel_setup_block: neo_pixel_1.neo_pixel_setup_block,
    led_matrix_make_draw_block: led_matrix_1.led_matrix_make_draw_block,
    led_matrix_turn_one_on_off_block: led_matrix_1.led_matrix_turn_one_on_off_block,
    lcd_backlight_block: lcd_screen_1.lcd_backlight_block,
    lcd_screen_blink_block: lcd_screen_1.lcd_screen_blink_block,
    lcd_screen_simple_print_block: lcd_screen_1.lcd_screen_simple_print_block,
    lcd_setup_block: lcd_screen_1.lcd_setup_block,
    lcd_screen_clear_block: lcd_screen_1.lcd_screen_clear_block,
    temp_get_temp_block: pass_through_block_1.temp_get_temp_block,
    ir_remote_scan_again_block: pass_through_block_1.ir_remote_scan_again_block,
    temp_setup_block: pass_through_block_1.temp_setup_block,
    ir_remote_setup_block: pass_through_block_1.ir_remote_setup_block,
    soil_sensor_setup_block: pass_through_block_1.soil_sensor_setup_block,
    bluetooth_setup_block: pass_through_block_1.bluetooth_setup_block
};
exports.valueGeneratingBlocks = valueGeneratingBlocks = {
    variables_get_boolean_block: variables_1.variables_get_boolean_block,
    variables_get_string_block: variables_1.variables_get_string_block,
    variables_get_colour_block: variables_1.variables_get_colour_block,
    variables_get_number_block: variables_1.variables_get_number_block,
    math_arithmetic_block: math_1.math_arithmetic_block,
    math_round_block: math_1.math_round_block,
    math_number_block: math_1.math_number_block,
    math_random_int_block: math_1.math_random_int_block,
    math_modulo_block: math_1.math_modulo_block,
    string_to_number_block: math_1.string_to_number_block,
    colour_random_block: colour_1.colour_random_block,
    colour_picker_block: colour_1.colour_picker_block,
    colour_rgb_block: colour_1.colour_rgb_block,
    get_colour_from_list_block: list_1.get_colour_from_list_block,
    get_boolean_from_list_block: list_1.get_boolean_from_list_block,
    get_number_from_list_block: list_1.get_number_from_list_block,
    get_string_from_list_block: list_1.get_string_from_list_block,
    logic_boolean_block: logic_1.logic_boolean_block,
    logic_compare_block: logic_1.logic_compare_block,
    logic_negate_block: logic_1.logic_negate_block,
    logic_operation_block: logic_1.logic_operation_block,
    text_block: text_1.text_block,
    text_changeCase_block: text_1.text_changeCase_block,
    text_isEmpty_block: text_1.text_isEmpty_block,
    text_join_block: text_1.text_join_block,
    text_length_block: text_1.text_length_block,
    number_to_string_block: text_1.number_to_string_block,
    parse_string_block_block: text_1.parse_string_block_block,
};
//# sourceMappingURL=frame_list.js.map