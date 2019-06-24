const electron = require('electron');
const { ipcRenderer } = electron;

const preSerialMonitorOutput = document.getElementById('text_from_serial_monitor');
const serialWriteInputBox = document.getElementById('serial-line');
const serialSubmitForm = document.getElementById('form-serial-monitor');


function clearSerialMonitorClick() {
    preSerialMonitorOutput.innerHTML = '';
}

ipcRenderer.on('usb:message', (event, message) => {
    preSerialMonitorOutput.innerText += message;
});


serialSubmitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ipcRenderer.send('send:message', serialWriteInputBox.value + '|');
});
