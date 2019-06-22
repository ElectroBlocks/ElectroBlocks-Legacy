export const simpleCode = `
	void setup() {
	 
	}
	
	void loop() {
	 
	}
`;


export const firmware = `
#include <Servo.h>
#include <Wire.h>
#include <LedControlMS.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_NeoPixel.h>
#include <AFMotor.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif


/**
 * Number of Rows in the lcd screen
 */
int LCD_NUMBER_OF_ROWS = 0;


/**
 * This the name of the variable that is being used
 */
String selectLCDScreenObject = "";

/**
 * LCD Objects
 */
LiquidCrystal_I2C lcd_03F_4_20(0x3F, 4, 20);
LiquidCrystal_I2C lcd_027_4_20(0x27, 4, 20);

LiquidCrystal_I2C lcd_027_2_16(0x27, 2, 16);
LiquidCrystal_I2C lcd_03F_2_16(0x3F, 2, 16);

AF_DCMotor motor_1(1);
AF_DCMotor motor_2(2);
AF_DCMotor motor_3(3);
AF_DCMotor motor_4(4);


/**
 * The Lex Matrix Variable
 */
LedControl * lc;

/**
 * Neo Pixel Object used to set color in the neo pixel
 */
Adafruit_NeoPixel NeoPixels = Adafruit_NeoPixel(60, A0, NEO_GRB + NEO_KHZ800);

/**
 * This is the servo being used.
 */
Servo servo;


/**
 * This stores the commands / usb messages sent to the arduino.
 */
String command = "";

/**
 * Restarts the Arduino
 */
void(* restartArduino) (void) = 0; //declare reset function @ address 0


/**
 * Parses a string to get all the values
 */
String getParseValue(String data, char separator, int index) {
  int found = 0;  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;
  for(int i=0; i<=maxIndex && found<=index; i++){
      if(data.charAt(i)==separator || i==maxIndex){
          found++;
          strIndex[0] = strIndex[1]+1;
          strIndex[1] = (i == maxIndex) ? i+1 : i;
      }
  }
  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

/**
 * Get's the LCD Object that is used.
 */
LiquidCrystal_I2C * getLCDObject(String lcdScreen) {
  if (lcdScreen == "lcd_027_2_16") {
      return & lcd_027_2_16;
  }

  if (lcdScreen == "lcd_03F_2_16") {
      return & lcd_03F_2_16;
  }

  if (lcdScreen == "lcd_027_4_20") {
     return & lcd_027_4_20;
  }

  if (lcdScreen == "lcd_03F_4_20") {
     return & lcd_03F_4_20;
  }

  return & lcd_03F_4_20;
}

/**
 * Sets up the neo pixel object.  Right now we can only one neo pixel strip with this version of the firmware
 *
 * Example Command -> A0:30
 * A0 -> The analog pin being used
 * 30 -> the number of leds in the strip.
 */
void setupNeoPixel(String objectSetup) {
   String analogPin = getParseValue(objectSetup, ':', 1);
   int numberOfNeoPixels = getParseValue(objectSetup,':', 2).toInt();

   if (analogPin == "A0") {
      NeoPixels.setPin(A0);
   } else if (analogPin == "A1") {
      NeoPixels.setPin(A1);
   } else if (analogPin == "A2") {
      NeoPixels.setPin(A2);
   } else if (analogPin == "A3") {
      NeoPixels.setPin(A3);
   } else if (analogPin == "A4") {
      NeoPixels.setPin(A4);
   } else if (analogPin == "A5") {
      NeoPixels.setPin(A5);
   }

   NeoPixels.updateLength(numberOfNeoPixels);

   NeoPixels.begin();

}

/**
 * Right now this only supports 20 by 4 or 16 by 2.
 *
 * Setups up the LCD Screen
 * Example 0x3F:4:20
 * 0x3F -> Memory Type
 * 4 -> number of row
 * 20 -> number of columns
 */
void setupLCDScreen(String objectSetup) {
   String memoryType = getParseValue(objectSetup, ':', 1);
   LCD_NUMBER_OF_ROWS = getParseValue(objectSetup, ':', 2).toInt();
   int columns = getParseValue(objectSetup, ':', 3).toInt();
   Serial.println("START SETUP LCD SCREEN");

   if (LCD_NUMBER_OF_ROWS == 4 && columns == 20 && memoryType == "0x3F") {
       selectLCDScreenObject = "lcd_03F_4_20";
   }

   if (LCD_NUMBER_OF_ROWS == 4 && columns == 20 && memoryType == "0x27") {
       selectLCDScreenObject = "lcd_027_4_20";
   }

   if (LCD_NUMBER_OF_ROWS == 2 && columns == 16 && memoryType == "0x3F") {
       selectLCDScreenObject = "lcd_03F_2_16";
   }

   if (LCD_NUMBER_OF_ROWS == 2 && columns == 16 && memoryType == "0x27") {
       selectLCDScreenObject = "lcd_027_2_16";
   }

   LiquidCrystal_I2C * lcd = getLCDObject(selectLCDScreenObject);

   lcd->init();
   lcd->backlight();

   Serial.println("FINISH SETUP LCD SCREEN");
}

/**
 * Setup up an led matrix
 */
void setupLEDMatrix()
{
  Serial.println("STARTING LED MATRIX");
  lc = new LedControl(12,11,10,1);
  lc->shutdown(0,false);
  lc->setIntensity(0,8);
  lc->clearDisplay(0);
  Serial.println("FINISHED BOOTING LED MATRIX");
}

/**
 * This sends off the setup command to the individual functions to setup
 *
 * L -> Means LCD Screen
 * LC -> Led Matrix
 * N -> NeoPixel
 *
 * Sets the individual objects up
 */
void setupObject(String objectSetup) {
    String objectType = getParseValue(objectSetup, ':', 0);

    if (objectType == "L") {
        setupLCDScreen(objectSetup);
        return;
    }

    if (objectType == "LC") {
       setupLEDMatrix();
       return;
    }

    if (objectType == "N") {
        setupNeoPixel(objectSetup);
        return;
    }
}

/**
 * EXAMPLE COMMAND -> S-1-L:0x3F:4:20
 * S means setups
 * 1 is the number of things that are being setup
 * The 0x3F:4:20 is the command that setups an lcd screen
 *
 * Setups servos, leds pins, led matrix etc for a project
 */
void setupForNewFrames(String command) {
  int numberOfObjectsToLoopThrough = getParseValue(command, '-', 1).toInt();
  for (int i = 2; i < numberOfObjectsToLoopThrough + 2; i += 1) {
       setupObject(getParseValue(command, '-', i));
  }
}


AF_DCMotor * getMotorObject(int motorNumber) {
  if (motorNumber == 1) {
     return & motor_1;
  }

  if (motorNumber == 2) {
     return & motor_2;
  }

  if (motorNumber == 3) {
     return & motor_3;
  }

  return & motor_4;
}

/**
 * Command Example M-MT-1:FORWARD:SPEED
 */
void controlMotor(String command) {
    String motorCommand = getParseValue(command, '-', 2);
    int motorNumber = getParseValue(motorCommand, ':', 0).toInt();
    String motorDirection = getParseValue(motorCommand, ':',1);
    int motorSpeed = getParseValue(motorCommand, ':', 2).toInt();
    AF_DCMotor * motor = getMotorObject(motorNumber);
    motor->setSpeed(motorSpeed);
    motor->run(motorDirection == "FORWARD" ? FORWARD : BACKWARD);
}



/**
 * Command Example M-P-A:4:60
 * M - Means its the a frame that is processing
 * P - Means Pin
 * A - Is the type of pin Analog / Digital
 * 130 - Means rotate the servo 130 degrees
 */
void changePinState(String command) {
   String pinState = getParseValue(command, '-', 2);
   String pin = getParseValue(pinState, ':', 1);
   String type = getParseValue(pinState, ':', 0);
   int state = getParseValue(pinState, ':', 2).toInt();

   if (type == "A") {
      analogWrite(pin.toInt(), state);
      Serial.println("Analog Pin " + String(pin) + " changed to " + String(state));
      return;
   }

   if (type == "D") {
      digitalWrite(pin.toInt(), state > 0 ? HIGH : LOW);
      String stateOfDigitalPin = state > 0 ? "HIGH" : "LOW";
      Serial.println("Digital Pin " + pin + " changed to " + stateOfDigitalPin);
      return;
   }
}

/**
 * Picks a pixel and starts blink
 * Example Command = B:1:3:1|
 *
 * B => Blink
 * 1 => ROW
 * 3 => COLUMN
 * 1 => BLINK if 0 then no blink
 *
 */
void blinkCommandLCD(String command) {
  LiquidCrystal_I2C * lcd = getLCDObject(selectLCDScreenObject);

     int row = getParseValue(command, ':', 2).toInt();
     int col = getParseValue(command, ':', 1).toInt();
     lcd->setCursor(row, col);
    if (getParseValue(command, ':', 3).toInt() == 1) {
       lcd->blink();
    } else {
       lcd->noBlink();
    }
}


/**
 * Turns on and off the back light of lcd screen
 *
 * Example Command = L:1| or L:0|
 */
void backLightLCD(String command) {
    LiquidCrystal_I2C * lcd = getLCDObject(selectLCDScreenObject);

     if ( getParseValue(command, ':', 1).toInt() == 1) {
          lcd->backlight();
     } else {
          lcd->noBacklight();
     }
}

/**
 * A move command for printing on the lcd screen
 *
 * Example Command M-L-P:Hello : World : OK : Works|
 *
 * Means move
 * L means LCD Screen
 * What get's printed
 * Hello
 *  World
 *  Ok
 *  Works
 */
void printLCDScreen(String command) {
   LiquidCrystal_I2C * lcd = getLCDObject(selectLCDScreenObject);

   for (int row = 1; row <= LCD_NUMBER_OF_ROWS; row += 1) {
      lcd->setCursor(0, row);
      lcd->print(getParseValue(command, ':', row));
   }

}

/**
 * Clear the lcd screen
 */
void clearLCDScreen() {
     Serial.println("CLEARED SCREEN");
   LiquidCrystal_I2C * lcd = getLCDObject(selectLCDScreenObject);
   lcd->clear();
}

/**
 * Example Commands
 * Clear = M-L-C:0| (Clears the screen)
 * Print = M-L-P:Hello : World : OK : Works| (Prints to the screen)
 * Blink = M-L-B:1:3:1| (Blink:row:column:1=blink, 0 = no blink)
 * Back Light = M-L-L:1| or M-L-L-0|
 *
 */
void LCDScreenCommand(String command) {
   String lcdCommand = getParseValue(command, '-', 2);
   String lcdCommandType = getParseValue(lcdCommand, ':', 0);
   Serial.println("COMMAND TYPE : " + lcdCommandType);
   if (lcdCommandType == "P") {
         printLCDScreen(lcdCommand);
   }

   if (lcdCommandType == "B") { // B = Blink
        blinkCommandLCD(lcdCommand);
   }

   if (lcdCommandType == "L") { // L = Back Light
        backLightLCD(lcdCommand);
   }

   if (lcdCommandType == "C") { // C = Clear
      clearLCDScreen();
   }
}



/**
 * Changes the state of the led in the led matrix
 *
 * Example Command M-LC-4:1:ON
 * M means move
 * LC means led matrix
 * 4 means row
 * 1 means column
 * ON means turn the led light in the matrix on
 *
 */
void changeLedOnMatrix(String command) {

   String ledMatrixCommand = getParseValue(command, '-', 2);

   Serial.println("MOVE STATE ON LED MATRIX");
   int row = getParseValue(ledMatrixCommand, ':', 0).toInt();
   int column = getParseValue(ledMatrixCommand, ':', 1).toInt();
   bool turnOnLed = getParseValue(ledMatrixCommand, ':', 2) == "ON";
   String isON = turnOnLed ? "ON" : "OFF";
   lc->setLed(0, row, column, turnOnLed);
   Serial.println("ROW " + String(row) + " COLUMN " + String(column) + " is " + isON);

}

void changeNeoPixelState(String command) {

    String neoPixelCommand = getParseValue(command, '-', 2);

    Serial.println("MOVE NEO PIXEL STATE");
    int redColor = getParseValue(neoPixelCommand, ':', 0).toInt();
    int greenColor = getParseValue(neoPixelCommand, ':', 1).toInt();
    int blueColor = getParseValue(neoPixelCommand, ':', 2).toInt();
    int pos = getParseValue(neoPixelCommand, ':', 3).toInt();
    Serial.println(neoPixelCommand);
    Serial.println("Red " + String(redColor) + " Green " + String(greenColor) + " Blue " + String(blueColor) + " pos " + String(pos));
    NeoPixels.setPixelColor(pos, redColor, greenColor, blueColor);
    NeoPixels.show();
}

/**
 * Command Example MOVE-S-3:130
 * MOVE - Means its the a frame that is processing
 * S - Means Servo
 * 3 - Means servo attached to pin 3
 * 130 - Means rotate the servo 130 degrees
 */
void moveServo(String command) {
   Serial.println("SERVO MOVE START");
   String servoMove = getParseValue(command, '-', 2);
   int angle = getParseValue(servoMove, ':', 1).toInt();
   servo.detach();
   servo.attach(getParseValue(servoMove, ':', 0).toInt());
   servo.write(angle);
   Serial.println("SERVO " + getParseValue(servoMove, ':', 0) + " moved " + String(angle));
   Serial.println("SERVO MOVE END");
}


/**
 * This process a next move / frame command
 * S means servo
 * P means pin
 * L means LCD Screen
 * LC means Led Matrix
 * N means Neo Pixel
 * MT means motor
 */
void nextMove(String command) {
   String typeOfCommand = getParseValue(command, '-', 1);

   if (typeOfCommand == "S") {
      moveServo(command);
      return;
   }

   if (typeOfCommand == "P") {
      changePinState(command);
      return;
   }

   if (typeOfCommand == "L") {
      LCDScreenCommand(command);
      return;
   }

   if (typeOfCommand == "LC") {
      changeLedOnMatrix(command);
      return;
   }

   if (typeOfCommand == "N") {
      changeNeoPixelState(command);
      return;
   }

   if (typeOfCommand == "MT") {
      controlMotor(command);
      return;
   }

}


void setup() {

  delay(100);

  Serial.begin(9600);

  Serial.println("STARTING ARDUINO");

}

void loop() {

  if (Serial.available() == 0 && command.indexOf("|") == -1) {
     return;
  }

  while (Serial.available() != 0) {
     command += Serial.readString();
  }

  command = command.substring(0, command.length() - 1);


  String commandType = getParseValue(command, '-', 0);

  Serial.println(command);

  if (commandType == "R") {
     restartArduino();
  }

  if (commandType == "S") {
     setupForNewFrames(command);
  }

  if (commandType == "M") {
      nextMove(command);
  }

  command = "";
}


`;
