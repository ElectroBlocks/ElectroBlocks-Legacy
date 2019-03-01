function digital_write_usb(command) {
    return `M-P-D:${command.pin}:${command.state}|`
};