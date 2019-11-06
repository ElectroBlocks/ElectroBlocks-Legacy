import { COLOR_THEME } from '../block/color_theme';
import { ToolboxEntry } from '../../toolbox.service';

export const getToolBoxString = (entries: ToolboxEntry[]) => {
  let toolbox = `<xml
  xmlns="https://developers.google.com/blockly/xml"
  id="toolbox-simple"
  style="display: none"
>`;

  if (entries.find((c) => c.name === 'Logic').show) {
    toolbox += `<category name="Logic" colour="${COLOR_THEME.CONTROL}">
    <block type="control_if"></block>
    <block type="controls_ifelse"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
  </category>`;
  }

  if (entries.find((c) => c.name === 'Loops').show) {
    toolbox += `<category name="Loops" colour="${COLOR_THEME.CONTROL}">
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  <block type="controls_for">
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
    <value name="BY">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>
</category>`;
  }
  if (entries.find((c) => c.name === 'Functions').show) {
    toolbox += `<category
  name="Functions"
  colour="${COLOR_THEME.CONTROL}"
  custom="PROCEDURE"
></category><sep></sep>`;
  }

  if (entries.find((c) => c.name === 'List').show) {
    toolbox += `<category name="List" colour="${COLOR_THEME.DATA}" custom="LIST"> </category>`;
  }

  if (entries.find((c) => c.name === 'Variables').show) {
    toolbox += `<category name="Variables" colour="${COLOR_THEME.DATA}" custom="VARIABLE"></category>`;
  }

  if (
    entries.find((c) => c.name === 'List').show ||
    entries.find((c) => c.name === 'Variables').show
  ) {
    toolbox += '<sep></sep>';
  }

  toolbox += `<category name="Data" colour="${COLOR_THEME.VALUES}">`;

  if (entries.find((c) => c.name === 'Color').show) {
    toolbox += `<category name="Color" colour="${COLOR_THEME.VALUES}">
    <block type="colour_picker"></block>
    <block type="colour_random"></block>
    <block type="colour_rgb">
      <value name="RED">
        <block type="math_number">
          <field name="NUM">100</field>
        </block>
      </value>
      <value name="GREEN">
        <block type="math_number">
          <field name="NUM">50</field>
        </block>
      </value>
      <value name="BLUE">
        <block type="math_number">
          <field name="NUM">0</field>
        </block>
      </value>
    </block>
  </category>`;
  }

  if (entries.find((c) => c.name === 'Math').show) {
    toolbox += `<category name="Math" colour="${COLOR_THEME.VALUES}">
  <block type="math_number">
    <field name="NUM">123</field>
  </block>
  <block type="math_arithmetic">
    <value name="A">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="B">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
  </block>
  <block type="string_to_number">
    <value name="VALUE">
      <block type="text">
        <field name="TEXT">5.35</field>
      </block>
    </value>
  </block>

  <block type="math_round">
    <value name="NUM">
      <block type="math_number">
        <field name="NUM">3.1</field>
      </block>
    </value>
  </block>
  <block type="math_modulo">
    <value name="DIVIDEND">
      <block type="math_number">
        <field name="NUM">64</field>
      </block>
    </value>
    <value name="DIVISOR">
      <block type="math_number">
        <field name="NUM">10</field>
      </block>
    </value>
  </block>
  <block type="math_random_int">
    <value name="FROM">
      <block type="math_number">
        <field name="NUM">1</field>
      </block>
    </value>
    <value name="TO">
      <block type="math_number">
        <field name="NUM">100</field>
      </block>
    </value>
  </block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Text').show) {
    toolbox += `
    <category name="Text" colour="${COLOR_THEME.VALUES}">
<block type="text"></block>
<block type="text_join"></block>
<block type="text_length">
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">abc</field>
    </block>
  </value>
</block>
<block type="parse_string_block">
  <value name="VALUE">
    <block type="text">
      <field name="TEXT">blue,red,green</field>
    </block>
  </value>
  <value name="POSITION">
    <block type="math_number">
      <field name="NUM">1</field>
    </block>
  </value>
</block>

<block type="number_to_string">
  <value name="VALUE">
    <block type="math_number">
      <field name="NUM">1</field>
    </block>
  </value>
</block>
<block type="text_isEmpty">
  <value name="VALUE">
    <block type="text">
      <field name="TEXT"></field>
    </block>
  </value>
</block>
<block type="text_changeCase">
  <value name="TEXT">
    <block type="text">
      <field name="TEXT">abc</field>
    </block>
  </value>
</block>
</category>`;
  }

  toolbox += '</category><sep></sep>';

  toolbox += `
<category name="Arduino" colour="${COLOR_THEME.ARDUINO}">`;

  if (entries.find((c) => c.name === 'Debug').show) {
    toolbox += `<category name="Debug" colour="${COLOR_THEME.ARDUINO}">
<block type="debug_block"></block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Message').show) {
    toolbox += `<category name="Message" colour="${COLOR_THEME.ARDUINO}">
<block type="message_setup"></block>
<block type="arduino_send_message">
<value name="MESSAGE">
                <block type="text">
                    <field name="TEXT">Hi</field>
                </block>
            </value>
</block>
<block type="arduino_get_message"></block>
<block type="arduino_receive_message"></block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Time').show) {
    toolbox += `<category colour="${COLOR_THEME.ARDUINO}" name="Time">
<block type="time_setup"></block>
<block type="delay_block">
<value name="DELAY">
    <block type="math_number">
        <field name="NUM">1</field>
    </block>
</value>
</block>
<block type="time_seconds"></block>

</category>`;
  }

  toolbox += '</category><sep></sep>';
  toolbox += `<category colour="${COLOR_THEME.COMPONENTS}" name="Components" >`;

  if (entries.find((c) => c.name === 'Bluetooth').show) {
    toolbox += `<category name="Bluetooth" colour="${COLOR_THEME.COMPONENTS}">
<block type="bluetooth_setup">
  <field name="RX">11</field>
  <field name="TX">10</field>
</block>
<block type="bluetooth_send_message">
  <value name="MESSAGE">
    <block type="text">
      <field name="TEXT">Hi</field>
    </block>
  </value>
</block>

<block type="bluetooth_has_message"></block>
<block type="bluetooth_get_message"></block>
</category>`;
  }

  if (entries.find((c) => c.name === 'LCD Screen').show) {
    toolbox += `<category colour="${COLOR_THEME.COMPONENTS}" name="LCD Screen">
<block type="lcd_setup"></block>
<block type="lcd_screen_simple_print">
<value name="ROW_1">
                <block type="text">
                    <field name="TEXT"></field>
                </block>
            </value>
            <value name="ROW_2">
                <block type="text">
                    <field name="TEXT"></field>
                </block>
            </value>
            <value name="ROW_3">
                <block type="text">
                    <field name="TEXT"></field>
                </block>
            </value>
            <value name="ROW_4">
                <block type="text">
                    <field name="TEXT"></field>
                </block>
            </value>
            <value name="DELAY">
                <block type="math_number">
                    <field name="NUM">3</field>
                </block>
            </value>
</block>
<block type="lcd_screen_print">
<value name="ROW">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
            <value name="COLUMN">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
            <value name="PRINT">
                <block type="text">
                    <field name="TEXT">Hi</field>
                </block>
            </value>
</block>
<block type="lcd_screen_clear"></block>
<block type="lcd_scroll"></block>
<block type="lcd_blink">
<value name="ROW">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
            <value name="COLUMN">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
</block>
<block type="lcd_backlight"></block>
</category>
`;
  }

  if (entries.find((c) => c.name === 'Led').show) {
    toolbox += `<category name="Led" colour="${COLOR_THEME.COMPONENTS}">
<block type="led"></block>

<block type="led_fade">
<value name="FADE">
                <block type="math_number">
                    <field name="NUM">125</field>
                </block>
            </value>
</block>
<block type="led_color_setup"></block>

<block type="set_color_led">
<value name="COLOUR">
                <block type="colour_picker">
                </block>
            </value>
</block>
<block type="digital_write"></block>

    <block type="analog_write">
    <value name="WRITE_VALUE">
                <block type="math_number">
                    <field name="NUM">50</field>
                </block>
            </value>
    </block>
</category>
`;
  }

  if (entries.find((c) => c.name === 'Led Light Strip').show) {
    toolbox += `<category name="Led Light Strip" colour="${COLOR_THEME.COMPONENTS}">
    <block type="neo_pixel_setup">
      <value name="NUMBER_LEDS">
        <block type="math_number">
          <field name="NUM">60</field>
        </block>
      </value>
    </block>
    <block type="neo_pixel_set_color">
      <value name="POSITION">
        <block type="math_number">
          <field name="NUM">1</field>
        </block>
      </value>
      <value name="COLOR">
        <block type="colour_picker"> </block>
      </value>
    </block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Led Matrix').show) {
    toolbox += `<category colour="${COLOR_THEME.COMPONENTS}" name="Led Matrix">
<block type="led_matrix_make_draw"></block>
<block type="led_matrix_turn_one_on_off">
<value name="ROW">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
            <value name="COLUMN">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
</block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Motor / Servo').show) {
    toolbox += `<category name="Motor / Servo" colour="${COLOR_THEME.COMPONENTS}">
<block type="move_motor">
<value name="SPEED">
                <block type="math_number">
                    <field name="NUM">5</field>
                </block>
            </value>
            <value name="MOTOR">
                <block type="math_number">
                    <field name="NUM">1</field>
                </block>
            </value>
</block>
<block type="rotate_servo">
<value name="DEGREE">
<block type="math_number">
    <field name="NUM">50</field>
</block>
</value>
</block>
</category>
`;
  }

  toolbox += '</category><sep></sep>';
  toolbox += `<category name="Sensors" colour="${COLOR_THEME.SENSOR}">`;

  if (entries.find((c) => c.name === 'Analog').show) {
    toolbox += `<category name="Analog" colour="${COLOR_THEME.SENSOR}" >
    <block type="analog_read_setup"></block>
    <block type="analog_read"></block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Buttons').show) {
    toolbox += `<category name="Buttons" colour="${COLOR_THEME.SENSOR}">
    <block type="push_button_setup"></block>
    <block type="is_button_pressed"></block>
</category>`;
  }

  if (entries.find((c) => c.name === 'Digital').show) {
    toolbox += `<category name="Digital" colour="${COLOR_THEME.SENSOR}">
    <block type="digital_read_setup"></block>
    <block type="digital_read"></block>
</category>`;
  }

  if (entries.find((c) => c.name === 'IR Remote').show) {
    toolbox += `<category name="IR Remote" colour="${COLOR_THEME.SENSOR}" >
    <block type="ir_remote_setup"></block>
    <block type="ir_remote_has_code_receive"></block>
    <block type="ir_remote_get_code"></block>
    </category>`;
  }

  if (entries.find((c) => c.name === 'Motion').show) {
    toolbox += `    <category name="Motion" colour="${COLOR_THEME.SENSOR}" >
    <block type="ultra_sonic_sensor_setup">
      <field name="TRIG">11</field>
      <field name="ECHO">10</field>
    </block>
    <block type="ultra_sonic_sensor_motion"></block>
    </category>
`;
  }

  if (entries.find((c) => c.name === 'RFID').show) {
    toolbox += `    <category name="RFID" colour="${COLOR_THEME.SENSOR}" >
        <block type="rfid_setup">
            <field name="RX">7</field>
            <field name="TX">6</field>
        </block>
        <block type="rfid_card"></block>
        <block type="rfid_tag"></block>
        <block type="rfid_scan"></block>
    </category>
`;
  }

  if (entries.find((c) => c.name === 'Temp').show) {
    toolbox += `<category name="Temp" colour="${COLOR_THEME.SENSOR}"  >
      <block type="temp_setup"></block>
      <block type="temp_get_temp"></block>
      <block type="temp_get_humidity"></block>
    </category>`;
  }

  toolbox += `</category></xml>`;

  return toolbox;
};
