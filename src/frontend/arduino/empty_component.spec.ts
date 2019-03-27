import 'jasmine';
import { EmptyComponent } from './empty_component';
import { COMMAND_TYPE } from "../frame/command";

describe('Empty Component', () => {
   
    it ('should return a blank string for usb command', () => {
        let emptyComponent = new EmptyComponent();
        expect(emptyComponent.usbCommand().command).toBe('');
        expect(emptyComponent.usbCommand().type).toBe(COMMAND_TYPE.EMPTY);
    });

    it ('should return a blank string for usb command', () => {
        let emptyComponent = new EmptyComponent();
        expect(emptyComponent.setupCommandUSB().command).toBe('');
        expect(emptyComponent.usbCommand().type).toBe(COMMAND_TYPE.EMPTY);
    });
});
