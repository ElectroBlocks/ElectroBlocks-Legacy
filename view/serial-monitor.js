const electron = require('electron');
const { remote, ipcRenderer } = electron;
const { serialPrintOutput$, openSerialPortIfClosed } = remote.require('./common/serial_port');

const preSerialMonitorOutput = document.getElementById('text_from_serial_monitor');
const serialWriteInputBox = document.getElementById('serial-line');
const serialSubmitForm = document.getElementById('form-serial-monitor');

const subscriptionSerialMonitor = serialPrintOutput$
    .subscribe(data => preSerialMonitorOutput.innerHTML += data);

function clearSerialMonitorClick() {
    preSerialMonitorOutput.innerHTML = '';
}

window.addEventListener('DOMContentLoaded', () => {
    openSerialPortIfClosed().take(1).subscribe(() => console.log('it worked'));
});


serialSubmitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    ipcRenderer.send('send:message', serialWriteInputBox.value);

});

window.addEventListener('unload', () => {
    subscriptionSerialMonitor.unsubscribe();
});