System.register("Frame", [], function (exports_1, context_1) {
    "use strict";
    var Frame;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Frame = (function () {
                function Frame() {
                }
                return Frame;
            }());
            exports_1("Frame", Frame);
        }
    };
});
System.register("arduino/copy", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("arduino/usb", [], function (exports_3, context_3) {
    "use strict";
    var USB_COMMAND_TYPES;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            (function (USB_COMMAND_TYPES) {
                USB_COMMAND_TYPES["MOVE"] = "M";
                USB_COMMAND_TYPES["END_OF_COMMAND"] = "|";
            })(USB_COMMAND_TYPES || (USB_COMMAND_TYPES = {}));
            exports_3("USB_COMMAND_TYPES", USB_COMMAND_TYPES);
            ;
        }
    };
});
System.register("arduino/lcd_screen", ["arduino/usb"], function (exports_4, context_4) {
    "use strict";
    var usb_1, LCDScreen;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (usb_1_1) {
                usb_1 = usb_1_1;
            }
        ],
        execute: function () {
            LCDScreen = (function () {
                function LCDScreen(rows, columns, rowsToPrint) {
                    this.rows = rows;
                    this.columns = columns;
                    this.rowsToPrint = rowsToPrint;
                }
                LCDScreen.prototype.usbCommand = function () {
                    var command = 'M-L-';
                    for (var i = 0; i < this.rows; i += 1) {
                        command += this.appendSpace(this.rowsToPrint[i] || '');
                        command += i < (this.rows - 1) ? ':' : '';
                    }
                    return command + usb_1.USB_COMMAND_TYPES.END_OF_COMMAND;
                };
                LCDScreen.prototype.appendSpace = function (printString) {
                    var spacesToPrint = this.columns - printString.length;
                    for (var i = 0; i < spacesToPrint; i += 1) {
                        printString += ' ';
                    }
                    return printString;
                };
                LCDScreen.prototype.makeCopy = function () {
                    return new LCDScreen(this.rows, this.columns, this.rowsToPrint);
                };
                return LCDScreen;
            }());
            exports_4("LCDScreen", LCDScreen);
        }
    };
});
System.register("arduino/lcd_screen.spec", ["arduino/lcd_screen", "jasmine"], function (exports_5, context_5) {
    "use strict";
    var lcd_screen_1;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (lcd_screen_1_1) {
                lcd_screen_1 = lcd_screen_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            describe('LCD Screen', function () {
                it('should print all the the number of rows in the lcd screen', function () {
                    var lcd = new lcd_screen_1.LCDScreen(2, 16, ['Hello', 'World', 'PEOPLE']);
                    expect(lcd.usbCommand()).toBe('M-L-Hello           :World           |');
                });
                it('should print strings with spaces', function () {
                    var lcd = new lcd_screen_1.LCDScreen(4, 20, ['  Hello  ', '  World  ', '   sdafsd  asdf', ' asdf ']);
                    expect(lcd.usbCommand()).toBe('M-L-  Hello             :  World             :   sdafsd  asdf     : asdf               |');
                });
                it('if all the rows are not given it should print a blank row', function () {
                    var lcd = new lcd_screen_1.LCDScreen(3, 5, ['1 ', 'Blue']);
                    expect(lcd.usbCommand()).toBe('M-L-1    :Blue :     |');
                });
                it('should be able to make a copy of itself', function () {
                    var lcd = new lcd_screen_1.LCDScreen(3, 5, ['1 ', 'Blue']);
                    var lcd2 = lcd.makeCopy();
                    expect(lcd).not.toBe(lcd2);
                    expect(lcd).toEqual(lcd2);
                    expect(lcd.usbCommand()).toBe(lcd2.usbCommand());
                });
            });
        }
    };
});
System.register("arduino/rgb", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("arduino/neo_pixels", ["arduino/usb"], function (exports_7, context_7) {
    "use strict";
    var usb_2, NeoPixelStrip, NeoPixel;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (usb_2_1) {
                usb_2 = usb_2_1;
            }
        ],
        execute: function () {
            NeoPixelStrip = (function () {
                function NeoPixelStrip() {
                    this.leds = new Array();
                }
                NeoPixelStrip.prototype.setLed = function (neoPixel) {
                    var led = this.leds.filter(function (led) { return led.position == neoPixel.position; })[0];
                    if (led) {
                        led.color = neoPixel.color;
                        return;
                    }
                    this.leds.push(neoPixel);
                };
                NeoPixelStrip.prototype.usbCommand = function () {
                    var command = '';
                    this.leds.forEach(function (led) {
                        command += led.usbCommand();
                    });
                    return command;
                };
                NeoPixelStrip.prototype.makeCopy = function () {
                    var neoPixel = new NeoPixelStrip();
                    this.leds.forEach(function (led) { return neoPixel.setLed(led); });
                    return neoPixel;
                };
                return NeoPixelStrip;
            }());
            exports_7("NeoPixelStrip", NeoPixelStrip);
            NeoPixel = (function () {
                function NeoPixel(color, position) {
                    this.color = color;
                    this.position = position;
                }
                NeoPixel.prototype.usbCommand = function () {
                    return usb_2.USB_COMMAND_TYPES.MOVE + "-" + NeoPixel.MOVE_COMMAND + "-" + this.color.red + ":" + this.color.green + ":" + this.color.blue + ":" + this.position + usb_2.USB_COMMAND_TYPES.END_OF_COMMAND;
                };
                NeoPixel.prototype.makeCopy = function () {
                    return new NeoPixel(this.color, this.position);
                };
                NeoPixel.MOVE_COMMAND = 'N';
                return NeoPixel;
            }());
            exports_7("NeoPixel", NeoPixel);
        }
    };
});
System.register("arduino/neo_pixel.spec", ["arduino/neo_pixels", "jasmine"], function (exports_8, context_8) {
    "use strict";
    var neo_pixels_1;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (neo_pixels_1_1) {
                neo_pixels_1 = neo_pixels_1_1;
            },
            function (_2) {
            }
        ],
        execute: function () {
            describe('Neo Pixel', function () {
                describe('NeoPixel', function () {
                    it('should make usb command', function () {
                        var neoPixel = new neo_pixels_1.NeoPixel({ red: 23, green: 34, blue: 44 }, 4);
                        expect(neoPixel.usbCommand()).toBe('M-N-23:34:44:4|');
                    });
                    it('should be able to make a copy of itself', function () {
                        var neoPixel = new neo_pixels_1.NeoPixel({ red: 23, green: 34, blue: 44 }, 4);
                        var neoPixel2 = neoPixel.makeCopy();
                        expect(neoPixel).not.toBe(neoPixel2);
                        expect(neoPixel).toEqual(neoPixel);
                    });
                });
                describe('NeoPixelStrip', function () {
                    it('should not have duplicate led positions', function () {
                        var neoPixelStrip = new neo_pixels_1.NeoPixelStrip();
                        neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 30, green: 20, blue: 0 }, 4));
                        neoPixelStrip.setLed(new neo_pixels_1.NeoPixel({ red: 30, green: 40, blue: 0 }, 4));
                        expect(neoPixelStrip.usbCommand()).toBe('M-N-30:40:0:4|');
                    });
                });
            });
        }
    };
});
System.register("arduino/pin", ["arduino/usb"], function (exports_9, context_9) {
    "use strict";
    var usb_3, Pin, PIN_TYPE, ARDUINO_UNO_PINS;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (usb_3_1) {
                usb_3 = usb_3_1;
            }
        ],
        execute: function () {
            Pin = (function () {
                function Pin(pinNumber, type, state) {
                    this.pinNumber = pinNumber;
                    this.type = type;
                    this.state = state;
                }
                Pin.prototype.usbCommand = function () {
                    var pinState = Math.abs(this.state);
                    if (this.type == PIN_TYPE.DIGITAL) {
                        pinState = pinState == 0 ? Pin.LOW : Pin.HIGH;
                    }
                    return usb_3.USB_COMMAND_TYPES.MOVE + "-" + Pin.MOVE_COMMAND + "-" + this.type + ":" + this.pinNumber + ":" + pinState + usb_3.USB_COMMAND_TYPES.END_OF_COMMAND;
                };
                Pin.prototype.makeCopy = function () {
                    return new Pin(this.pinNumber, this.type, this.state);
                };
                Pin.MOVE_COMMAND = 'P';
                Pin.HIGH = 1;
                Pin.LOW = 0;
                return Pin;
            }());
            exports_9("Pin", Pin);
            (function (PIN_TYPE) {
                PIN_TYPE["DIGITAL"] = "D";
                PIN_TYPE["ANALOG"] = "A";
            })(PIN_TYPE || (PIN_TYPE = {}));
            exports_9("PIN_TYPE", PIN_TYPE);
            ;
            (function (ARDUINO_UNO_PINS) {
                ARDUINO_UNO_PINS["PIN_1"] = "1";
                ARDUINO_UNO_PINS["PIN_2"] = "2";
                ARDUINO_UNO_PINS["PIN_3"] = "3";
                ARDUINO_UNO_PINS["PIN_4"] = "4";
                ARDUINO_UNO_PINS["PIN_5"] = "5";
                ARDUINO_UNO_PINS["PIN_6"] = "6";
                ARDUINO_UNO_PINS["PIN_7"] = "7";
                ARDUINO_UNO_PINS["PIN_8"] = "8";
                ARDUINO_UNO_PINS["PIN_10"] = "10";
                ARDUINO_UNO_PINS["PIN_11"] = "11";
                ARDUINO_UNO_PINS["PIN_12"] = "12";
                ARDUINO_UNO_PINS["PIN_13"] = "13";
                ARDUINO_UNO_PINS["PIN_A0"] = "A0";
                ARDUINO_UNO_PINS["PIN_A1"] = "A1";
                ARDUINO_UNO_PINS["PIN_A2"] = "A2";
                ARDUINO_UNO_PINS["PIN_A3"] = "A3";
                ARDUINO_UNO_PINS["PIN_A4"] = "A4";
                ARDUINO_UNO_PINS["PIN_A5"] = "A5";
            })(ARDUINO_UNO_PINS || (ARDUINO_UNO_PINS = {}));
            exports_9("ARDUINO_UNO_PINS", ARDUINO_UNO_PINS);
        }
    };
});
System.register("arduino/pin.spec", ["arduino/pin", "jasmine"], function (exports_10, context_10) {
    "use strict";
    var pin_1;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (pin_1_1) {
                pin_1 = pin_1_1;
            },
            function (_3) {
            }
        ],
        execute: function () {
            describe('Pin Test', function () {
                it('should generate the correct command.', function () {
                    var pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_12, pin_1.PIN_TYPE.DIGITAL, pin_1.Pin.HIGH);
                    expect(pin.usbCommand()).toBe('M-P-D:12:1|');
                });
                it('digital pins should only be HIGH or LOW', function () {
                    var pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_3, pin_1.PIN_TYPE.DIGITAL, 1000);
                    expect(pin.usbCommand()).toBe('M-P-D:3:1|');
                    pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_3, pin_1.PIN_TYPE.DIGITAL, -32);
                    expect(pin.usbCommand()).toBe('M-P-D:3:1|');
                });
                it('analog pin should only do positive number values', function () {
                    var pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_A0, pin_1.PIN_TYPE.ANALOG, -120);
                    expect(pin.usbCommand()).toBe('M-P-A:A0:120|');
                });
                it('it should be able to make a copy of itself', function () {
                    var pin = new pin_1.Pin(pin_1.ARDUINO_UNO_PINS.PIN_A0, pin_1.PIN_TYPE.ANALOG, -120);
                    var pin2 = pin.makeCopy();
                    expect(pin).not.toBe(pin2);
                    expect(pin).toEqual(pin2);
                    expect(pin.usbCommand()).toBe(pin2.usbCommand());
                });
            });
        }
    };
});
//# sourceMappingURL=frontend.js.map