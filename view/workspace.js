const electron = require('electron');
const { remote } = electron;
const { arduinoUSB$ } = remote.require('./common/serial_port');
const uploadSpan = document.getElementById('arduino-upload');

arduinoUSB$.subscribe(usb => {
     if (usb) {
         uploadSpan.classList.add('active');
         uploadSpan.setAttribute('title', 'Arduino Connected');
     } else {
         uploadSpan.classList.remove('active');
         uploadSpan.setAttribute('title', 'Arduino Not Connected');
     }
});

