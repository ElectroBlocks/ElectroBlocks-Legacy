const electron = require('electron');
const { remote, ipcRenderer } = electron;
const { arduinoUSB$, serialDebugOutput$, openSerialPort } = remote.require('./common/serial_port');
const { DEBUG_TABLE_FILTER } = remote.require('./common/constants');

const uploadSpan = document.getElementById('arduino-upload');
const debugMenu = document.getElementById('debug-menu');
const debugBtn = document.getElementById('debug-btn');
const debugTbody = document.getElementById('debug-tbody');
const serialMonitorBtn = document.getElementById('serial-monitor');
const RX = require('rxjs/Rx');
const { Subject } = RX;

const renderDebugSubject = new Subject();

const renderDebug$ = renderDebugSubject.asObservable();

document.addEventListener('DOMContentLoaded', () => {
    openSerialPort().take(1).subscribe(err => {
        if (err) {
            console.log('THERE WAS AN ERROR OPENING SERIAL PORT: ' + err);
        }
    });
});

arduinoUSB$.subscribe(usb => {
     if (usb) {
         uploadSpan.classList.add('active');
         uploadSpan.setAttribute('title', 'Arduino Connected');
     } else {
         uploadSpan.classList.remove('active');
         uploadSpan.setAttribute('title', 'Arduino Not Connected');
     }
});

debugBtn.addEventListener('click',  () => {
   if (debugBtn.classList.contains('active')) {
       debugBtn.classList.remove('active');
       debugMenu.style.display = 'none';
   } else {
       debugBtn.classList.add('active');
       debugMenu.style.display = 'block';
   }
});

serialMonitorBtn.addEventListener('click', () => {
    ipcRenderer.send('open:serial-monitor');
    serialMonitorBtn.classList.add('active');
});

ipcRenderer.on('close:serial-monitor', () => {
    serialMonitorBtn.classList.remove('active');
});

const debugTableData = {};

serialDebugOutput$
    .do(data =>  {
        const parts = data.toString().replace(DEBUG_TABLE_FILTER,'').split('_|_');
        debugTableData[parts[0]] = {type: parts[1], value: parts[2] };
    })
    .subscribe(() =>  renderDebugSubject.next());

renderDebug$.subscribe(() => {
    let tbody = '';
    Object.keys(debugTableData).forEach(key => {
         tbody += '<tr>';
         tbody += '<td>' + key + '</td>';
         tbody += '<td>' + debugTableData[key].type + '</td>';
         tbody += '<td>' + debugTableData[key].value + '</td>';
         tbody += '</tr>';
    });

    debugTbody.innerHTML = tbody;
});


