"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("../frame/command");
class EmptyComponent {
    usbCommand() {
        return new command_1.EmptyCommand();
    }
    setupCommandUSB() {
        return new command_1.EmptyCommand();
    }
}
exports.EmptyComponent = EmptyComponent;
//# sourceMappingURL=empty_component.js.map