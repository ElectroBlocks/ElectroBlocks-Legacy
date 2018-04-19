/**
 * Dependencies
 */
const electron = require('electron');
const { remote, ipcRenderer } = electron;
const {arduinoUSB$, serialDebugOutput$, serialDebugBlockOutput$} = remote.require('./common/serial_port');
const {uploadCode}  = remote.require('./common/upload_code');
const { NODE_ERROR } = remote.require('./common/constants');
const prompt = remote.require('electron-prompt');
const { dialog } = remote;
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
const continueBtn = document.getElementById('continue-btn');
const uploadCodeIcon = document.getElementById('upload-code-icon');

/**
 * variable for storing data to render the debug table.
 */
let debugTableData = {};

/**
 * Returns true if uploading code
 * @type {boolean}
 */
let uploadingCode = false;

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

    if (uploadingCode || uploadCodeBtn.classList.contains('disable')) {
        return;
    }

    uploadingCode = true;
    uploadCodeIcon.classList.remove('fa-play');
    uploadCodeIcon.classList.add('fa-spinner');
    uploadCodeIcon.classList.add('fa-spin');
    uploadCodeBtn.classList.add('disable');
    uploadCode(Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace))
        .do(() => debugTableData = {})
        .take(1)
        .subscribe(err => {
            uploadCodeIcon.classList.add('fa-play');
            uploadCodeIcon.classList.remove('fa-spinner');
            uploadCodeIcon.classList.remove('fa-spin');
            uploadCodeBtn.classList.remove('disable');
            uploadingCode = false;

            if (err) {
                alert('Error uploading your code :(');
                return;
            }
         
            alert('Your code has been uploaded.');
        });
});

continueBtn.addEventListener('click', () => {
    ipcRenderer.send('debug:continue');
    clearDebugBlocks();
});

ipcRenderer.on('close:serial-monitor', () => {
    serialMonitorBtn.classList.remove('active');
});

ipcRenderer.on('menu:save', (event, createNewFile = false) => {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var code = Blockly.Xml.domToText(xml);
    if (createNewFile) {
        dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [
                { name: 'Arduino Blockly', extensions: ['xml'] }
            ]
        }, filePath => {
            if (filePath) {
                ipcRenderer.send('save:file', code, filePath)
            }
        });

        return;
    }

    ipcRenderer.send('save:file', code);
});

ipcRenderer.on(NODE_ERROR, (message) => {
    alert(message);
});

ipcRenderer.on('open:file', (event, content) => {
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(content));
});

/**
 * Observables
 */
serialMonitorBtn.addEventListener('click', () => {
    if (serialMonitorBtn.classList.contains('disable')) {
        return;
    }
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
            serialMonitorBtn.classList.remove('disable');
            uploadCodeBtn.classList.remove('disable');
        } else {
            arduinoConnected.classList.remove('active');
            arduinoConnected.setAttribute('title', 'Arduino Not Connected');
            serialMonitorBtn.classList.add('disable');
            uploadCodeBtn.classList.add('disable');
        }
    });

serialDebugBlockOutput$.subscribe(blockNumber => {
    const blocks = Blockly.mainWorkspace.getAllBlocks();

    for (let i = 0; i < blocks.length; i += 1) {
        if (blocks[i].id == blockNumber) {
            blocks[i].setColour(450);
            blocks[i].select();
            continue;
        }

        if (blocks[i].type === 'debug') {
            blocks[i].setColour(210);
        }
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


/**
 * This goes through all the debug blocks and clears them out
 */
function clearDebugBlocks() {
    const blocks = Blockly.mainWorkspace.getAllBlocks();
    if (Blockly.selected) {
        Blockly.selected.unselect();
    }
    for (let i = 0; i < blocks.length; i += 1) {
        if (blocks[i].type === 'debug') {
            blocks[i].setColour(210);
        }
    }
}

