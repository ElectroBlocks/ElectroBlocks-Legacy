goog.provide('Blockly.Arduino.wifi');

goog.require('Blockly.Arduino');



Blockly.Arduino['wifi_setup'] = function (block) {

    var networkName = Blockly.Arduino.valueToCode(block, 'WIFI NAME', Blockly.Arduino.ORDER_ATOMIC);
    var password = Blockly.Arduino.valueToCode(block, 'WIFI PASSWORD', Blockly.Arduino.ORDER_ATOMIC);

    var wifiRequestFunction = 'String webRequest(const char * httpVerb, String url,String contentType, String requestBody) {\n' +
            '\tHTTPClient http; \n' +
            '\thttp.begin(url); \n' +
            '\thttp.setUserAgent("Arduino/1.0");\n' +
            '\thttp.addHeader("Content-Type", contentType); \n' +
            '\tif (httpVerb == "GET") { \n' +
                '\t\thttp.GET(); \n' +
            '\t} \n' +
            '\telse { \n' +
            '\t\thttp.sendRequest(httpVerb, requestBody); \n' +
            '\t} \n' +
            '\treturn http.getString(); \n' +
            '} \n';

    Blockly.Arduino.definitions_['define_wifi_setup'] = "#include <ESP8266HTTPClient.h>\n#include <ESP8266WiFi.h>\n\n\n"
        + wifiRequestFunction;
    Blockly.Arduino._serial_setup();
    Blockly.Arduino.setups_['wifi_setup'] = 'WiFi.begin(' + networkName +  ', ' + password + '); \n' +
    '  Serial.print("Connecting WIFI: "); \n' +
    '  while (WiFi.status() != WL_CONNECTED) { \n' +
    '\tSerial.print(".");\n' +
    '\tdelay(500); \n' +
    '  } \n' +
    '  Serial.println("CONNECTED"); \n';

    return '';
};

Blockly.Arduino['wifi_request'] = function (block) {

    var httpVerb = block.getFieldValue('HTTP VERB');
    var contentType = block.getFieldValue('CONTENT TYPE');
    var url = Blockly.Arduino.valueToCode(block, 'URL', Blockly.Arduino.ORDER_ATOMIC);
    var requestBody = Blockly.Arduino.valueToCode(block, 'REQUEST BODY', Blockly.Arduino.ORDER_ATOMIC) || "";

    var code = 'webRequest("' + httpVerb + '", ' + url + ', "' + contentType + '", ' + requestBody + ')';

    return [code, Blockly.Arduino.ORDER_ATOMIC];
};