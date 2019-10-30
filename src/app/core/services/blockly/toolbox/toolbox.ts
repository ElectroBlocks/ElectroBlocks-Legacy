export const toolbox = `<xml
  xmlns="https://developers.google.com/blockly/xml"
  id="toolbox-simple"
  style="display: none"
>
  <category name="Logic" colour="%{BKY_LOGIC_HUE}">
    <block type="control_if"></block>
    <block type="controls_ifelse"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
  </category>

  <category name="Loops" colour="%{BKY_LOOPS_HUE}">
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
</category>

  <sep></sep>
  <category name="List" colour="260" custom="LIST"> </category>
  <category name="Variables" colour="330" custom="VARIABLE">
  </category>

  <category
  name="Functions"
  colour="%{BKY_PROCEDURES_HUE}"
  custom="PROCEDURE"
></category>
  <sep></sep>
  <category name="Color" colour="%{BKY_COLOUR_HUE}">
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
  </category>

  <category name="Math" colour="%{BKY_MATH_HUE}">
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
</category>
<category name="Text" colour="%{BKY_TEXTS_HUE}">
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
</category>

<sep></sep>
<category name="Bluetooth" colour="290">
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
</category>
<category name="Buttons" colour="260">
<block type="push_button_setup"></block>
<block type="is_button_pressed"></block>
</category>
<category name="Debug" colour="65">
<block type="debug_block"></block>
</category>
<category name="Message" colour="20">
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
</category>
<category name="Pins" colour="260">
    <block type="analog_read_setup"></block>
    <block type="digital_read_setup"></block>
    <block type="digital_write"></block>
    <block type="digital_read"></block>
    <block type="analog_read"></block>
    <block type="analog_write">
    <value name="WRITE_VALUE">
                <block type="math_number">
                    <field name="NUM">50</field>
                </block>
            </value>
    </block>

</category>




<category colour="330" name="Time">
<block type="time_setup"></block>
<block type="delay_block">
<value name="DELAY">
    <block type="math_number">
        <field name="NUM">1</field>
    </block>
</value>
</block>
<block type="time_seconds"></block>


</category>
<sep></sep>
<category colour="290" name="LCD Screen">
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
<category name="Led" colour="230">
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
</category>

<category name="Led Light Strip" colour="0">
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
</category>
<category colour="260" name="Led Matrix">
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
</category>
<category name="Motor / Servo" colour="190">
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


<sep></sep>


<category name="IR Remote" colour="210">
<block type="ir_remote_setup"></block>
<block type="ir_remote_has_code_receive"></block>
<block type="ir_remote_get_code"></block>
</category>
<category name="Motion Sensor" colour="230">
<block type="ultra_sonic_sensor_setup">
  <field name="TRIG">11</field>
  <field name="ECHO">10</field>
</block>
<block type="ultra_sonic_sensor_motion"></block>
</category>

<category name="RFID" colour="260">
    <block type="rfid_setup">
        <field name="RX">7</field>
        <field name="TX">6</field>
    </block>
    <block type="rfid_card"></block>
    <block type="rfid_tag"></block>
    <block type="rfid_scan"></block>
</category>

<category name="Temp / Humidity" colour="330">
  <block type="temp_setup"></block>
  <block type="temp_get_temp"></block>
  <block type="temp_get_humidity"></block>
</category>


</xml>
`;
