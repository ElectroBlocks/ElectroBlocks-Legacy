"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class ExecuteUSBFrame {
    constructor() {
    }
    executeCommand(command) {
        electron_1.ipcRenderer.send('send:message', command);
    }
}
exports.ExecuteUSBFrame = ExecuteUSBFrame;
class ExecuteDebugFrame {
    executeCommand(command) {
        console.log(command, 'USB COMMAND');
    }
}
exports.ExecuteDebugFrame = ExecuteDebugFrame;
class ExecuteSilentFrame {
    executeCommand(command) {
    }
}
exports.ExecuteSilentFrame = ExecuteSilentFrame;
//# sourceMappingURL=frame_execute.js.map