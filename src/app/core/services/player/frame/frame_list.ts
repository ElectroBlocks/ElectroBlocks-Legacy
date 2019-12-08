import { Frame, FrameLocation } from './frame';

import { Block } from 'blockly';

import { Color } from '../frame_genorator/color';

import { is_button_pressed_block } from '../frame_genorator/button';

import { ultra_sonic_sensor_motion_block } from '../frame_genorator/motionsensor';

import {
  bluetooth_get_message_block,
  bluetooth_has_message_block,
  bluetooth_send_message_block
} from '../frame_genorator/bluetooth';

import {
  colour_picker_block,
  colour_random_block,
  colour_rgb_block
} from '../frame_genorator/color_blocks';

import {
  digital_write_block,
  analog_write_block,
  digital_read_block,
  analog_read_block
} from '../frame_genorator/input_output';

import { delay_block_block, time_seconds_block } from '../frame_genorator/time';

import { rotate_servo_block } from '../frame_genorator/servo';

import { move_motor_block } from '../frame_genorator/motor';

import { led_block, led_fade_block } from '../frame_genorator/led';

import { debug_block_block } from '../frame_genorator/debug';

import {
  ir_remote_get_code_block,
  ir_remote_has_code_receive_block
} from '../frame_genorator/ir_remote';

import {
  temp_get_temp_block,
  temp_get_humidity_block
} from '../frame_genorator/temp';

import {
  temp_setup_block,
  ir_remote_setup_block,
  soil_sensor_setup_block,
  bluetooth_setup_block,
  rfid_setup_block,
  push_button_setup_block,
  message_setup_block,
  time_setup_block,
  digital_read_setup_block,
  analog_read_setup_block,
  ultra_sonic_sensor_setup_block
} from '../frame_genorator/pass_through_block';

import {
  led_matrix_make_draw_block,
  led_matrix_turn_one_on_off_block
} from '../frame_genorator/led_matrix';

import {
  neo_pixel_set_color_block,
  neo_pixel_setup_block
} from '../frame_genorator/neo-pixel';

import {
  lcd_backlight_block,
  lcd_screen_blink_block,
  lcd_screen_simple_print_block,
  lcd_setup_block,
  lcd_screen_clear_block,
  lcd_scroll_block,
  lcd_screen_print_block
} from '../frame_genorator/lcd_screen';

import {
  variables_set_boolean_block,
  variables_set_string_block,
  variables_set_colour_block,
  variables_set_number_block,
  variables_get_boolean_block,
  variables_get_string_block,
  variables_get_colour_block,
  variables_get_number_block
} from '../frame_genorator/variables';

import {
  math_arithmetic_block,
  math_round_block,
  math_number_block,
  math_random_int_block,
  math_modulo_block,
  string_to_number_block
} from '../frame_genorator/math';

import {
  arduino_send_message_block,
  arduino_get_message_block,
  arduino_receive_message_block
} from '../frame_genorator/message';

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
  set_color_led_block,
  led_color_setup_block
} from '../frame_genorator/led_color';

import {
  logic_boolean_block,
  logic_compare_block,
  logic_negate_block,
  logic_operation_block,
  control_if_block,
  controls_ifelse_block
} from '../frame_genorator/logic';

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
} from '../frame_genorator/text';

import {
  rfid_card_block,
  rfid_scan_block,
  rfid_tag_block
} from '../frame_genorator/rfid';

let valueGeneratingBlocks: {
  [key: string]: (
    block: Block,
    frameLocation: FrameLocation,
    previousFrame?: Frame
  ) =>
    | number
    | string
    | boolean
    | Color
    | Array<number | string | boolean | Color>;
};

let frameGeneratingBlocks: {
  [key: string]: (
    block: Block,
    frameLocation: FrameLocation,
    previousFrame?: Frame
  ) => Frame[];
};

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
  controls_repeat_ext_block,

  digital_write_block,
  analog_write_block,

  delay_block_block,
  time_setup_block,

  arduino_send_message_block,
  rotate_servo_block,

  move_motor_block,

  debug_block_block,

  neo_pixel_set_color_block,
  neo_pixel_setup_block,

  led_matrix_make_draw_block,
  led_matrix_turn_one_on_off_block,

  led_block,
  led_fade_block,

  lcd_backlight_block,
  lcd_screen_blink_block,
  lcd_screen_simple_print_block,
  lcd_setup_block,
  lcd_screen_clear_block,
  lcd_scroll_block,
  lcd_screen_print_block,

  temp_get_temp_block: temp_setup_block,
  temp_setup_block,
  ir_remote_setup_block,
  soil_sensor_setup_block,
  bluetooth_setup_block,
  push_button_setup_block,
  message_setup_block,

  set_color_led_block,
  led_color_setup_block,

  rfid_setup_block,

  bluetooth_send_message_block,
  digital_read_setup_block,
  analog_read_setup_block,

  ultra_sonic_sensor_setup_block
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
  parse_string_block_block,

  rfid_card_block,
  rfid_scan_block,
  rfid_tag_block,

  bluetooth_get_message_block,
  bluetooth_has_message_block,

  is_button_pressed_block,

  arduino_get_message_block,
  arduino_receive_message_block,

  time_seconds_block,
  digital_read_block,
  analog_read_block,

  ir_remote_get_code_block,
  ir_remote_has_code_receive_block,

  ultra_sonic_sensor_motion_block,
  temp_get_temp_block,
  temp_get_humidity_block
};

export { frameGeneratingBlocks, valueGeneratingBlocks };
