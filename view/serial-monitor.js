const electron = require('electron');
const { remote, ipcRenderer } = electron;
const { serialPrintOutput$ } = remote.require('./common/serial_port');
const preSerialMonitorOutput = document.getElementById('text_from_serial_monitor');
require('rxjs/add/operator/filter');

const subscriptionSerialMonitor = serialPrintOutput$
    .subscribe(data => preSerialMonitorOutput.innerHTML += data);

function clearSerialMonitorClick() {
    preSerialMonitorOutput.innerHTML = '';
}

function sendMessage() {

}

window.addEventListener('unload', () => {
    subscriptionSerialMonitor.unsubscribe();
});