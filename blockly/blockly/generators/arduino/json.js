goog.provide('Blockly.Arduino.json');

goog.require('Blockly.Arduino');

Blockly.Arduino['json_get_data'] = function (block) {
    Blockly.Arduino.definitions_['define_json'] = '#include <ArduinoJson.h>\n';
    var jsonFunctionParse = '(String jsonString, String key) { \n' +
        '\tDynamicJsonBuffer  jsonBuffer; \n' +

        '\tJsonObject& root = jsonBuffer.parseObject(jsonString);\n' +

        '\treturn root[key];\n' +
        '}\n';

    Blockly.Arduino.definitions_['json_parse_functions'] = '';
    for (var i = 0; i < VARIABLE_TYPES.length; i += 1) {
        console.log(VARIABLE_TYPES[i][1], 'variable Type');
        Blockly.Arduino.definitions_['json_parse_functions'] +=
            VARIABLE_TYPES[i][1] + ' parseJSON' + VARIABLE_TYPES[i][1].toUpperCase() +  jsonFunctionParse;
    }

    var dataType = block.getFieldValue('DATA TYPE');
    var jsonKey =  Blockly.Arduino.valueToCode(block, 'KEY', Blockly.Arduino.ORDER_ATOMIC);
    var jsonString = Blockly.Arduino.valueToCode(block, 'JSON STRING', Blockly.Arduino.ORDER_ATOMIC);

    var code = 'parseJSON' + dataType.toUpperCase() + '(' + jsonString + ', ' + jsonKey + ')';

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

