import  'jasmine';
import { EmptyComponent } from './empty_component';

describe('Empty Component', () => {
   
    it ('should return a blank string for usb command', () => {
        let emptyComponent = new EmptyComponent();
        expect(emptyComponent.usbCommand()).toBe('');
    });

    it ('should return a blank string for usb command', () => {
        let emptyComponent = new EmptyComponent();
        expect(emptyComponent.setupCommandUSB()).toBe('');
    });
});