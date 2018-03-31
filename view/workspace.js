/**
 * Dependencies
 */
const electron = require('electron');
const {remote, ipcRenderer} = electron;
const {arduinoUSB$, serialDebugOutput$} = remote.require('./common/serial_port');
const {uploadCode}  = remote.require('./common/upload_code');
const prompt = remote.require('electron-prompt');

/**
 * Elements
 */
const arduinoConnected = document.getElementById('arduino-connected');
const debugMenu = document.getElementById('debug-menu');
const debugBtn = document.getElementById('debug-btn');
const debugTbody = document.getElementById('debug-tbody');
const serialMonitorBtn = document.getElementById('serial-monitor');
const toolbox = document.getElementById('toolbox');
const blocklyDiv = document.getElementById('content-blocks');
const uploadCodeBtn = document.getElementById('upload-code-btn');

/**
 * variable for storing data to render the debug table.
 */
const debugTableData = {};


Blockly.changeVariableName = (selectedMessage, oldVarName) => {

    if (selectedMessage != Blockly.Msg.RENAME_VARIABLE) {
        return;
    }

    prompt({
        title: 'Renaming',
        label: 'Renaming variable to:',
        type: 'input'
    }).then(newVar => {
        if (newVar) {
            newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
            if (newVar == Blockly.Msg.RENAME_VARIABLE || newVar == Blockly.Msg.NEW_VARIABLE) {
                return;
            }
            Blockly.Variables.renameVariable(oldVarName, newVar, Blockly.mainWorkspace);
        }

    });

};

/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', () => {

    window.addEventListener('resize', resizeListener, false);

    Blockly.inject(blocklyDiv,
        {
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            media: './images/media/',
            toolbox: toolbox
        });

    resizeListener();
});

debugBtn.addEventListener('click', () => {
    if (debugBtn.classList.contains('active')) {
        debugBtn.classList.remove('active');
        debugMenu.style.display = 'none';
    } else {
        debugBtn.classList.add('active');
        debugMenu.style.display = 'block';
    }
    resizeListener();
});


uploadCodeBtn.addEventListener('click', () => {
    console.log(Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace));

    uploadCodeBtn.disabled = true;
     uploadCode(Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace)).subscribe(err => {
         uploadCodeBtn.disabled = false;
         if (err) {
             console.log(err);
             alert('Error uploading your code :(');
         } else {
             alert('it worked!!');
         }
     });
});

ipcRenderer.on('close:serial-monitor', () => {
    serialMonitorBtn.classList.remove('active');
});


/**
 * Observables
 */
serialMonitorBtn.addEventListener('click', () => {
    ipcRenderer.send('open:serial-monitor');
    serialMonitorBtn.classList.add('active');
});


serialDebugOutput$
    .do(parts => debugTableData[parts[0]] = {type: parts[1], value: parts[2]})
    .subscribe(() => redrawDebugTable());


arduinoUSB$
    .subscribe(usb => {
        if (usb) {
            arduinoConnected.classList.add('active');
            arduinoConnected.setAttribute('title', 'Arduino Connected');
        } else {
            arduinoConnected.classList.remove('active');
            arduinoConnected.setAttribute('title', 'Arduino Not Connected');
        }
    });

/**
 * This redraws the debug table
 */
function redrawDebugTable() {
    let tbody = '';
    Object.keys(debugTableData).forEach(key => {
        tbody += '<tr>';
        tbody += '<td>' + key + '</td>';
        tbody += '<td>' + debugTableData[key].type + '</td>';
        tbody += '<td>' + debugTableData[key].value + '</td>';
        tbody += '</tr>';
    });

    debugTbody.innerHTML = tbody;
}

/**
 * Controls the resizing
 */
function resizeListener() {
    blocklyDiv.style.height =
        (document.getElementsByTagName('body')[0].clientHeight - document.getElementById('top-menu').clientHeight - debugMenu.clientHeight).toString() + "px";
    Blockly.svgResize(Blockly.mainWorkspace);
};


