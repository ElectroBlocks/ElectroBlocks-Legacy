export interface USB {

    /**
     * This will generate a usb command to send
     */
    usbCommand(): string;

    /**
     * This will only do the component part of the command.
     */
    setupCommandUSB(): string;

}


export enum USB_COMMAND_TYPES  { 
    MOVE = 'M',
    SETUP = 'S',
    SERVO = 'S',
    PIN = 'P',
    LCD = 'L',
    LED_MATRIX = 'LC',
    NEO_PIXEL = 'N',
    END_OF_COMMAND = '|'
};

