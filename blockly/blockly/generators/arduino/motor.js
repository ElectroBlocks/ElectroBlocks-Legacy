goog.provide('Blockly.Arduino.motor');

goog.require('Blockly.Arduino');


Blockly.Arduino['motor'] = function (block) {
    Blockly.Arduino.definitions_['define_motor'] = '#include <AFMotor.h>\n AF_DCMotor motor1(1);\n AF_DCMotor motor2(2);\n\n';


    var speed = Blockly.Arduino.valueToCode(block, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
    var direction = this.getFieldValue('direction');
    var motor = this.getFieldValue('motor');

    if (motor == '1') {
        return 'motor1.setSpeed(0);\nmotor1.run(' + direction + ');\nmotor1.setSpeed(' + speed +');\n';
    } else {
        return 'motor2.setSpeed(0);\nmotor2.run(' + direction + ');\nmotor2.setSpeed(' + speed +');\n';
    }

};