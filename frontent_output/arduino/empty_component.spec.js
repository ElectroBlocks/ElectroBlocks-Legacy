"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const empty_component_1 = require("./empty_component");
describe('Empty Component', () => {
    it('should return a blank string for usb command', () => {
        let emptyComponent = new empty_component_1.EmptyComponent();
        expect(emptyComponent.usbCommand()).toBe('');
    });
    it('should return a blank string for usb command', () => {
        let emptyComponent = new empty_component_1.EmptyComponent();
        expect(emptyComponent.setupCommandUSB()).toBe('');
    });
});
//# sourceMappingURL=empty_component.spec.js.map