"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require('serialport');
var Delimiter = require('@serialport/parser-delimiter');
var AvrGirl = require('avrgirl-arduino');
var path = require('path');
var fs = require('fs');
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Promisify = require("bluebird");
var axios_1 = require("axios");
var ArduinoOnlineState;
(function (ArduinoOnlineState) {
    ArduinoOnlineState["DISCONNECTED"] = "DISCONNECTED";
    ArduinoOnlineState["CONNECTED"] = "CONNECTED";
    ArduinoOnlineState["UPLOADING_CODE"] = "UPLOADING_CODE";
    ArduinoOnlineState["UPLOAD_CODE_COMPLETE"] = "UPLOAD_CODE_COMPLETE";
    ArduinoOnlineState["UPLOAD_CODE_ERROR"] = "UPLOAD_CODE_ERROR";
})(ArduinoOnlineState = exports.ArduinoOnlineState || (exports.ArduinoOnlineState = {}));
var SerialPortArduino = /** @class */ (function () {
    function SerialPortArduino() {
        this.portInfo = null;
        this.uploadingCode = false;
        this.serialPortStatusSubject = new rxjs_1.BehaviorSubject(ArduinoOnlineState.DISCONNECTED);
        this.serialOutputSubject = new rxjs_1.Subject();
        this.serialOutput$ = this.serialOutputSubject
            .asObservable()
            .pipe(operators_1.share());
        this.serialPortStatus$ = this.serialPortStatusSubject
            .asObservable()
            .pipe(operators_1.share());
        this.runSerialPortCheck();
    }
    SerialPortArduino.isArduino = function (port) {
        if (port.vendorId || port.productId) {
            return (port.vendorId === '2341' ||
                port.productId === '0043' ||
                port.vendorId === '0x2341' ||
                port.productId === '0x0043');
        }
        return false;
    };
    SerialPortArduino.prototype.runSerialPortCheck = function () {
        var _this = this;
        this.timeOut = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkSerialPort()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }, 500);
    };
    SerialPortArduino.prototype.checkSerialPort = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arduinoUnoSerialPort, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (this.uploadingCode) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, SerialPort.list()];
                    case 1:
                        arduinoUnoSerialPort = (_a.sent()).filter(function (port) {
                            return SerialPortArduino.isArduino(port);
                        })[0];
                        this.portInfo = arduinoUnoSerialPort;
                        if (this.serialPortConnection === undefined && this.portInfo) {
                            this.open();
                            return [2 /*return*/];
                        }
                        if (this.serialPortConnection) {
                            return [2 /*return*/];
                        }
                        this.serialPortStatusSubject.next(ArduinoOnlineState.DISCONNECTED);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1, 'CHECKING_SERIAL_PORT');
                        this.serialPortStatusSubject.next(ArduinoOnlineState.DISCONNECTED);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SerialPortArduino.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.serialPortConnection = new SerialPort(this.portInfo.path, {
                            baudRate: 9600,
                            autoOpen: true
                        });
                        parser = this.serialPortConnection.pipe(new Delimiter({ delimiter: '\n' }));
                        parser.on('data', function (line) {
                            _this.serialOutputSubject.next(line.toString('utf8', 0, line.toJSON().data.length - 1));
                        });
                        this.serialPortConnection.on('close', function () {
                            _this.serialPortConnection = undefined;
                            if (!_this.uploadingCode) {
                                _this.serialPortStatusSubject.next(ArduinoOnlineState.DISCONNECTED);
                            }
                            console.log('Serial Port was closed');
                        });
                        return [4 /*yield*/, new Promise(function (res, rej) {
                                _this.serialPortConnection.on('open', function (portOpenError) {
                                    return portOpenError ? rej(portOpenError) : res(undefined);
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.serialPortStatusSubject.next(ArduinoOnlineState.CONNECTED);
                        return [2 /*return*/];
                }
            });
        });
    };
    SerialPortArduino.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (res, rej) {
                            if (!_this.serialPortConnection) {
                                res(undefined);
                            }
                            _this.serialPortConnection.close(function (err) { return (err ? rej(err) : res(undefined)); });
                        })];
                    case 1:
                        _a.sent();
                        this.serialPortConnection = undefined;
                        return [4 /*yield*/, Promisify.delay(300)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SerialPortArduino.prototype.writeArduinoHexFile = function (code) {
        if (!fs.existsSync(SerialPortArduino.ARDUINO_TEMP_FOLDER)) {
            fs.mkdirSync(SerialPortArduino.ARDUINO_TEMP_FOLDER);
        }
        if (fs.existsSync(SerialPortArduino.ARDUINO_FILE)) {
            fs.unlinkSync(SerialPortArduino.ARDUINO_FILE);
        }
        fs.writeFileSync(SerialPortArduino.ARDUINO_FILE, code);
    };
    SerialPortArduino.prototype.isOpen = function () {
        return this.serialPortConnection === undefined;
    };
    SerialPortArduino.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.serialPortConnection) {
                    this.serialPortConnection.write(message);
                    return [2 /*return*/];
                }
                console.log('error no serial port');
                return [2 /*return*/];
            });
        });
    };
    SerialPortArduino.prototype.flashArduino = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var response, avrgirl_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (this.uploadingCode) {
                            return [2 /*return*/];
                        }
                        this.uploadingCode = true;
                        this.serialPortStatusSubject.next(ArduinoOnlineState.UPLOADING_CODE);
                        clearInterval(this.timeOut);
                        return [4 /*yield*/, this.close()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, axios_1.default.post(SerialPortArduino.DEFAULT_ARDUINO_URL, code, {
                                headers: { 'Content-Type': 'text/plain' }
                            })];
                    case 2:
                        response = _a.sent();
                        this.writeArduinoHexFile(response.data);
                        avrgirl_1 = new AvrGirl({
                            board: 'uno',
                            port: this.portInfo.path
                        });
                        return [4 /*yield*/, new Promise(function (res, rej) {
                                avrgirl_1.flash(SerialPortArduino.ARDUINO_FILE, function (error) {
                                    return error ? rej(error) : res(undefined);
                                });
                            })];
                    case 3:
                        _a.sent();
                        this.serialPortStatusSubject.next(ArduinoOnlineState.UPLOAD_CODE_COMPLETE);
                        this.uploadingCode = false;
                        this.runSerialPortCheck();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        console.error(e_2, 'UPLOADING_ERROR');
                        this.uploadingCode = false;
                        this.serialPortStatusSubject.next(ArduinoOnlineState.UPLOAD_CODE_ERROR);
                        this.runSerialPortCheck();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SerialPortArduino.ARDUINO_FILE = path.join('/', 'tmp', 'Arduino.cpp.hex');
    SerialPortArduino.ARDUINO_TEMP_FOLDER = path.join('/', 'tmp');
    SerialPortArduino.DEFAULT_ARDUINO_URL = 'http://arduino-compile.noahglaser.net/upload-code/uno';
    return SerialPortArduino;
}());
exports.SerialPortArduino = SerialPortArduino;
//# sourceMappingURL=serial_port.js.map