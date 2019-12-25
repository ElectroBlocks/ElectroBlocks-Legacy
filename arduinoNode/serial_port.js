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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var SerialPort = require('serialport');
var Delimiter = require('@serialport/parser-delimiter');
var rxjs_1 = require("rxjs");
var rxjs_2 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ArduinoOnlineState;
(function (ArduinoOnlineState) {
    ArduinoOnlineState["DISCONNECTED"] = "DISCONNECTED";
    ArduinoOnlineState["CONNECTED"] = "CONNECTED";
    ArduinoOnlineState["UPLOADING_CODE"] = "UPLOADING_CODE";
    ArduinoOnlineState["UPLOAD_CODE_COMPLETE"] = "UPLOAD_CODE_COMPLETE";
})(ArduinoOnlineState = exports.ArduinoOnlineState || (exports.ArduinoOnlineState = {}));
var serialPortConnection;
var subjectSerialOutput = new rxjs_1.BehaviorSubject('');
exports.serialOutput$ = subjectSerialOutput.pipe(operators_1.share());
exports.openSerialPort = function (portInfo) { return __awaiter(_this, void 0, void 0, function () {
    var error, parser, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!portInfo) {
                    return [2 /*return*/, ArduinoOnlineState.DISCONNECTED];
                }
                return [4 /*yield*/, exports.closerSerialPort()];
            case 1:
                error = _a.sent();
                console.log('close error ', error);
                serialPortConnection = new SerialPort(portInfo.path, {
                    baudRate: 9600,
                    autoOpen: true
                });
                parser = serialPortConnection.pipe(new Delimiter({ delimiter: '\n' }));
                parser.on('data', function (line) {
                    subjectSerialOutput.next(line.toString('utf8', 0, line.toJSON().data.length - 1));
                });
                serialPortConnection.on('close', function () {
                    console.log('Serial Port was closed');
                });
                return [4 /*yield*/, new Promise(function (res, rej) {
                        serialPortConnection.on('open', function (err) {
                            res(err);
                        });
                    })];
            case 2:
                err = _a.sent();
                if (err) {
                    console.error(err, 'opening serial port error');
                    return [2 /*return*/, ArduinoOnlineState.DISCONNECTED];
                }
                else {
                    return [2 /*return*/, ArduinoOnlineState.CONNECTED];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.closerSerialPort = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (serialPortConnection === undefined) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, new Promise(function (res, rej) {
                        serialPortConnection.close(function (err) { return res(err); });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Helper function to determine if usb port is an arduino.
 *
 * @param port
 * @returns {boolean}
 */
exports.isArduino = function (port) {
    if (port.vendorId || port.productId) {
        return (port.vendorId === '2341' ||
            port.productId === '0043' ||
            port.vendorId === '0x2341' ||
            port.productId === '0x0043');
    }
    return false;
};
exports.arduinoPorts$ = rxjs_2.interval(500).pipe(operators_1.switchMap(function () { return rxjs_2.from(SerialPort.list()); }), operators_1.map(function (usbs) { return usbs.filter(exports.isArduino)[0]; }), operators_1.distinctUntilChanged(function (prev, curr) {
    if (curr === prev) {
        return true;
    }
    if (curr === undefined && prev) {
        return false;
    }
    if (prev === undefined && curr) {
        return false;
    }
    return prev.comName === curr.comName;
}), operators_1.switchMap(function (usbInfo) { return rxjs_2.from(exports.openSerialPort(usbInfo)); }), operators_1.share());
//# sourceMappingURL=serial_port.js.map