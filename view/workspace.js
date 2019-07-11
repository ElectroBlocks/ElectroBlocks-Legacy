const { framePlayer }  = require("../output/frontend/frame/frame_player");
const { setupVideoPlayer, toggleDebugViewer, toggleDebugBlocks} = require( "../output/frontend/workspace/player-buttons.listeners.js");

/**
 * Dependencies
 */
const electron = require('electron');
const { remote, ipcRenderer } = electron;
const prompt = remote.require('electron-prompt');
const displacejs = require('displacejs');
const { dialog } = remote;


require('../output/frontend/workspace/player-output.subscribers');

/**
 * Elements
 */
const arduinoConnected = document.getElementById('arduino-connected');
const variableMenu = document.getElementById('variable-menu');
const debugTbody = document.getElementById('debug-tbody');
const serialMonitorBtn = document.getElementById('serial-monitor');
const blocklyDiv = document.getElementById('content-blocks');
const uploadCodeBtn = document.getElementById('upload-code-btn');
const continueBtn = document.getElementById('continue-btn');
const uploadCodeIcon = document.getElementById('upload-code-icon');
const videoDebugIcon = document.getElementById('video-debug-icon');

/**
 * Button that triggers video edit mode
 */
const videoDebugBtn = document.getElementById( 'debug-video-btn' );


/**
 * Containers
 */
const videoContainer = document.getElementById( 'video-controls-container' );


const sliderContainer = document.getElementById( 'slide-container' );




displacejs(variableMenu);
/**
 * letiable for storing data to render the debug table.
 */
let debugTableData = {};

/**
 *  true if uploading code
 * @type {boolean}
 */
let uploadingCode = false;

/**
 *  true if the usb is connect
 * @type {boolean}
 */
let usbConnected = false;

/**
 * True if debug video mode is on
 * @type {boolean}
 */
let debugVideoMode = false;

/**
 * Replaces the blockly prompt with something that will work with electron.
 * @param message
 * @param defaultValue
 * @param callback
 */
Blockly.prompt = function(message, defaultValue, callback) {
    prompt({
        title: message,
        value: defaultValue,
        type: 'input'
    }).then(value => {
        callback(value);
    });
};

setTimeout(() => {
    Blockly.mainWorkspace.addChangeListener((event) => {
        ipcRenderer.send('display:code', Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace));
    });

    resizeListener();

}, 100);


/**
 * Event Listeners
 */
document.addEventListener('DOMContentLoaded', () => {

    ipcRenderer.send('check:usb');

    window.addEventListener('resize', resizeListener, false);

    require('./blockly');

});



ipcRenderer.on('upload:complete', (event, hasError, message) => {

    console.log(hasError, message);
    uploadingCode = false;
    uploadCodeIcon.classList.add('fa-play');
    uploadCodeIcon.classList.remove('fa-spinner');
    uploadCodeIcon.classList.remove('fa-spin');
    uploadCodeBtn.classList.remove('disable');

    if (!hasError) {
        alert('Your code has been uploaded.');
        return;
    }

    console.log('error message', message);
    alert('Error uploading your code :(');

});

ipcRenderer.on('close:serial-monitor', () => {
    serialMonitorBtn.classList.remove('active');
});

ipcRenderer.on('menu:save', (event, createNewFile = false) => {
    let xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let code = Blockly.Xml.domToText(xml);
    if (createNewFile) {
        dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [
                { name: 'ElectroBlocks', extensions: ['xml'] }
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

ipcRenderer.on('menu:new', () => {
    Blockly.mainWorkspace.clear();
    let xml = '<xml><block type="arduino_start" deletable="false" movable="true"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), Blockly.mainWorkspace);
    Blockly.mainWorkspace.centerOnBlock(Blockly.mainWorkspace.getAllBlocks()[0].id);
});

ipcRenderer.on('node:error', (message, data) => {
    console.log(message, data);
    alert('There was an error');
});

ipcRenderer.on('open:file', (event, content) => {
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(content), Blockly.mainWorkspace);

    toggleDebugBlocks( debugVideoMode );

});

ipcRenderer.on('get:code', () => {
    ipcRenderer.send('display:code', Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace));
});

ipcRenderer.on('menu:changeUploadUrl', () => {
    prompt({
        title: 'Change Blockly Upload Url',
        type: 'input'
    }).then(url => {
        if (url) {
            ipcRenderer.send('upload:change_url', url);
        }
    });
});

ipcRenderer.on('debug:message', (event, content) => {
    console.log(content, 'debug message');
    debugTableData[content.name] = {type: content.type, value: content.value};
    redrawDebugTable();
});

ipcRenderer.on('debug:block', (event, blockId) => {
    const blocks = Blockly.mainWorkspace.getAllBlocks();

    for (let i = 0; i < blocks.length; i += 1) {
        if (blocks[i].id === blockId) {
            blocks[i].setColour("#000000");
            blocks[i].select();
            continue;
        }

        if (blocks[i].type === 'debug') {
            blocks[i].setColour(345);
        }
    }
});

ipcRenderer.on('arduino:usb', (event, isConnected) => {
    usbConnected = isConnected;
    if (isConnected) {
        arduinoConnected.classList.add('active');
        arduinoConnected.setAttribute('title', 'Arduino Connected');

        uploadCodeBtn.classList.remove('disable');
        uploadCodeBtn.classList.add('active');

        serialMonitorBtn.classList.remove('disable');


    } else {
        arduinoConnected.classList.remove('active');
        arduinoConnected
            .setAttribute('title', 'Arduino Not Connected');

        serialMonitorBtn.classList.add('disable');

        uploadCodeBtn.classList.add('disable');
        uploadCodeBtn.classList.remove('active');
    }
});


ipcRenderer.on('video:debug', async (event, turnOnDebugMode) => {

    uploadingCode = false;
    debugVideoMode = turnOnDebugMode;

    uploadCodeBtn.classList.remove('disable');
    videoDebugBtn.classList.remove('disable');
    videoDebugIcon.classList.add('fa-film');
    videoDebugIcon.classList.remove('fa-spinner');
    videoDebugIcon.classList.remove('fa-spin');


    if (!turnOnDebugMode) {
        sliderContainer.style.display = 'none';
        videoContainer.style.display = 'none';
        videoDebugBtn.classList.remove( 'active' );
        toggleDebugBlocks( false );
        resizeListener();
        toggleDebugViewer();
        document.getElementById( 'content-blocks' ).style.height = 'inherit';

        return;
    }

    await setupVideoPlayer();
    await framePlayer.skipToFrame(0);
    videoDebugBtn.classList.add( 'active' );
    sliderContainer.style.display = 'block';
    videoContainer.style.display = 'block';
    toggleDebugBlocks( true );
    document.getElementById( 'content-blocks' ).style.height = '600px';
    toggleDebugViewer();
    resizeListener();

});

videoDebugBtn.addEventListener( 'click',  () => {

    if (!usbConnected) {
        ipcRenderer.send('video:debug-mode', sliderContainer.style.display !== 'block');
        return;
    }

    if (uploadingCode) {
        return;
    }

    uploadingCode = true;

    uploadCodeBtn.classList.add('disable');
    videoDebugBtn.classList.add('disable');
    videoDebugIcon.classList.remove('fa-film');
    videoDebugIcon.classList.add('fa-spinner');
    videoDebugIcon.classList.add('fa-spin');

    ipcRenderer.send('video:debug-mode', sliderContainer.style.display !== 'block');
});


uploadCodeBtn.addEventListener('click', () => {

    if (uploadingCode || uploadCodeBtn.classList.contains('disable')) {
        return;
    }

    if (!navigator.onLine) {
        alert('Please connect to the internet and try again.');
        return;
    }

    uploadingCode = true;
    uploadCodeIcon.classList.remove('fa-play');
    uploadCodeIcon.classList.add('fa-spinner');
    uploadCodeIcon.classList.add('fa-spin');
    uploadCodeBtn.classList.add('disable');

    ipcRenderer.send('upload:code',
        Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace));

});

continueBtn.addEventListener('click', () => {
    ipcRenderer.send('debug:continue');
    clearDebugBlocks();
});

serialMonitorBtn.addEventListener('click', () => {
    if (serialMonitorBtn.classList.contains('disable')) {
        return;
    }
    ipcRenderer.send('open:serial-monitor');
    serialMonitorBtn.classList.add('active');
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
 * Controls the resizing block area
 */
function resizeListener() {
    const blocklyDiv = document.getElementById( 'content-blocks' );

    blocklyDiv.style.height =
        (document.getElementsByTagName( 'body' )[ 0 ].clientHeight - document.getElementById( 'top-menu' ).clientHeight - (videoContainer.clientHeight + sliderContainer.clientHeight)).toString() + "px";

    document.getElementById('virtual-circuit').style.height = blocklyDiv.style.height;

    if (window.panZoom) {
        window.panZoom.resize();
    }

    console.log(blocklyDiv.style.height, 'block height');
    Blockly.svgResize(Blockly.mainWorkspace)
}

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
            blocks[i].setColour(345);
        }
    }
}

