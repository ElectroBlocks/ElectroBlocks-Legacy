"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const empty_component_1 = require("./empty_component");
const command_1 = require("../frame/command");
describe('Empty Component', () => {
    it('should return a blank string for usb command', () => {
        let emptyComponent = new empty_component_1.EmptyComponent();
        expect(emptyComponent.usbCommand().command).toBe('');
        expect(emptyComponent.usbCommand().type).toBe(command_1.COMMAND_TYPE.EMPTY);
    });
    it('should return a blank string for usb command', () => {
        let emptyComponent = new empty_component_1.EmptyComponent();
        expect(emptyComponent.setupCommandUSB().command).toBe('');
        expect(emptyComponent.usbCommand().type).toBe(command_1.COMMAND_TYPE.EMPTY);
    });
});
//# sourceMappingURL=empty_component.spec.js.map