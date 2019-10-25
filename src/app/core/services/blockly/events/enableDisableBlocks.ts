/**
 * List of key value block type => setup block required
 */
const blocksThatRequireSetup = {
  bluetooth_send_message: 'bluetooth_setup',
  bluetooth_has_message: 'bluetooth_setup',
  bluetooth_get_message: 'bluetooth_setup',
  lcd_screen_simple_print: 'lcd_setup',
  lcd_screen_clear: 'lcd_setup',
  lcd_screen_print: 'lcd_setup',
  lcd_screen_blink: 'lcd_setup',
  neo_pixel_set_color: 'neo_pixel_setup',
  soil_humidity_percentage: 'soil_sensor_setup',
  soil_humidity_value: 'soil_sensor_setup',
  soil_is_raining: 'soil_sensor_setup',
  ir_remote_has_code_receive: 'ir_remote_setup',
  ir_remote_get_code: 'ir_remote_setup',
  temp_read_temp_humidity: 'temp_setup',
  temp_get_temp: 'temp_setup',
  temp_get_humidity: 'temp_setup',
  set_color_led: 'led_color_setup',
  rfid_scan: 'rfid_setup',
  rfid_tag: 'rfid_setup',
  rfid_card: 'rfid_setup',
  is_button_pressed: 'push_button_setup',
  arduino_send_message: 'message_setup',
  arduino_get_message: 'message_setup',
  arduino_receive_message: 'message_setup',
  digital_read: 'digital_read_setup',
  analog_read: 'analog_read_setup'
};

const standAloneBlocks = [
  'soil_sensor_setup_2',
  'rfid_setup',
  'arduino_start',
  'create_list_number_block',
  'create_list_string_block',
  'create_list_boolean_block',
  'create_list_colour_block',
  'procedures_defnoreturn',
  'procedures_defreturn',
  'lcd_setup',
  'neo_pixel_setup',
  'soil_sensor_setup',
  'ir_remote_setup',
  'temp_setup',
  'bluetooth_setup',
  'led_color_setup',
  'push_button_setup',
  'message_setup',
  'time_setup',
  'analog_read_setup',
  'digital_read_setup'
];

export const blockMultipleSetup = [
  'push_button_setup',
  'digital_read_setup',
  'analog_read_setup'
];

export const sensorSetupBlocks = [
  'rfid_setup',
  'push_button_setup',
  'bluetooth_setup',
  'message_setup',
  'digital_read_setup',
  'analog_read_setup'
];

const disableBlockForNotHavingRequiredSetupBlock = (blocks, testBlock) => {
  if (!blocksThatRequireSetup[testBlock.type]) {
    return false;
  }

  console.log(blocks);
  return (
    blocks.findIndex(potentialSetupBlock => {
      return (
        potentialSetupBlock.type === blocksThatRequireSetup[testBlock.type]
      );
    }) === -1
  );
};

const toggleDisableChildBlocks = (parentBlock, disable) => {
  parentBlock.setEnabled(!disable);
  let nextBlock = parentBlock.getNextBlock();
  while (nextBlock) {
    nextBlock.setEnabled(!disable);
    nextBlock = nextBlock.getNextBlock();
  }
};

export const disableEnableBlocks = workspace => {
  const blocks = workspace.getAllBlocks();

  // Disables duplicate setup blocks
  blocks
    .filter(block => standAloneBlocks.includes(block.type))
    .forEach(setupBlock => {
      const disableSetupBlock =
        blocks.filter(
          block =>
            block.type === setupBlock.type &&
            setupBlock.type !== 'arduino_start'
        ).length > 1;
      setupBlock.setEnabled(
        !disableSetupBlock || blockMultipleSetup.includes(setupBlock.type)
      );
    });

  // Disables / Enables Blocks that don't have the required setup blocks
  blocks
    .filter(block => {
      // Exclude all stand alone blocks
      return !standAloneBlocks.includes(block.type);
    })
    .forEach(block => {
      if (disableBlockForNotHavingRequiredSetupBlock(blocks, block)) {
        block.setEnabled(false);
        toggleDisableChildBlocks(block, true);
        return;
      }

      // Means that the block is required to be inside a loop
      // We know this because it's not a stand alone block
      if (!standAloneBlocks.includes(block.getRootBlock().type)) {
        block.setEnabled(false);
        toggleDisableChildBlocks(block, true);
        return;
      }

      block.setEnabled(true);
      toggleDisableChildBlocks(block, false);
    });
};
