"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyCommand {
    constructor() {
        this.command = '';
        this.type = COMMAND_TYPE.EMPTY;
    }
}
exports.EmptyCommand = EmptyCommand;
class TimeCommand {
    constructor(command) {
        this.command = command;
        this.type = COMMAND_TYPE.TIME;
    }
}
exports.TimeCommand = TimeCommand;
class MessageCommand {
    constructor(command) {
        this.command = command;
        this.type = COMMAND_TYPE.MESSAGE;
    }
}
exports.MessageCommand = MessageCommand;
var COMMAND_TYPE;
(function (COMMAND_TYPE) {
    COMMAND_TYPE[COMMAND_TYPE["USB"] = 0] = "USB";
    COMMAND_TYPE[COMMAND_TYPE["TIME"] = 1] = "TIME";
    COMMAND_TYPE[COMMAND_TYPE["EMPTY"] = 2] = "EMPTY";
    COMMAND_TYPE[COMMAND_TYPE["MESSAGE"] = 3] = "MESSAGE";
    COMMAND_TYPE[COMMAND_TYPE["BLUETOOTH_MESSAGE"] = 4] = "BLUETOOTH_MESSAGE";
})(COMMAND_TYPE = exports.COMMAND_TYPE || (exports.COMMAND_TYPE = {}));
//# sourceMappingURL=command.js.map