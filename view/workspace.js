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

/**
 * A list of stand alone blocks
 * @type {[*]}
 */
const standAloneBlocks = [
    'arduino_start',
    'create_list_number_block',
    'create_list_string_block',
    'create_list_boolean_block',
    'create_list_colour_block',
    'procedures_defnoreturn',
    'procedures_defreturn',
    'lcd_setup',
    'neo_pixel_setup',
    'soil_sensor_setup',
    'ir_remote_setup',
    'temp_setup',
    'bluetooth_setup'
];

const setupBlocks = [
    'lcd_setup',
    'neo_pixel_setup',
    'soil_sensor_setup',
    'ir_remote_setup',
    'temp_setup',
    'bluetooth_setup'
];

const blocksThatRequireSetup = {
    'bt_receive_message': 'bluetooth_setup',
    'bt_has_message': 'bluetooth_setup',
    'bt_send_message': 'bluetooth_setup',
    'lcd_screen_simple_print': 'lcd_setup',
    'lcd_screen_clear': 'lcd_setup',
    'lcd_screen_print': 'lcd_setup',
    'lcd_screen_blink': 'lcd_setup',
    'neo_pixel_set_color': 'neo_pixel_setup',
    'soil_humidity_percentage': 'soil_sensor_setup',
    'soil_humidity_value': 'soil_sensor_setup',
    'soil_is_raining': 'soil_sensor_setup',
    'ir_remote_has_code_receive': 'ir_remote_setup',
    'ir_remote_get_code': 'ir_remote_setup',
    'ir_remote_scan_again': 'ir_remote_setup',
    'temp_read_temp_humidity': 'temp_setup',
    'temp_get_temp': 'temp_setup',
    'temp_get_humidity': 'temp_setup'
};

Blockly.prompt = function(message, defaultValue, callback) {
    prompt({
        title: message,
        value: defaultValue,
        type: 'input'
    }).then(value => {
        callback(value);
    });
};

// Blockly.changeVariableName = (selectedMessage, oldVarName) => {
//
//     if (selectedMessage != Blockly.Msg.RENAME_VARIABLE) {
//         return;
//     }
//
//     prompt({
//         title: 'Renaming',
//         label: 'Renaming variable to:',
//         type: 'input'
//     }).then(newVar => {
//         if (newVar) {
//             newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
//             if (newVar == Blockly.Msg.RENAME_VARIABLE || newVar == Blockly.Msg.NEW_VARIABLE) {
//                 return;
//             }
//             Blockly.Variables.renameVariable(oldVarName, newVar, Blockly.mainWorkspace);
//         }
//
//     });
// };

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
            media: './media/',
            toolbox: toolbox
        });

    Blockly.mainWorkspace.addChangeListener((event) => {
        ipcRenderer.send('display:code', Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace));
    });

    var xml = '<xml><block type="arduino_start" deletable="false" movable="true"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), Blockly.mainWorkspace);
    Blockly.mainWorkspace.centerOnBlock(Blockly.mainWorkspace.getAllBlocks()[0].id);


    // Clean up variable when a
    Blockly.mainWorkspace.addChangeListener(function (event) {

        var blocks = Blockly.mainWorkspace.getAllBlocks();

        for (var k = 0; k < blocks.length; k += 1) {
            for (var property in blocksThatRequireSetup) {
                if (!blocksThatRequireSetup.hasOwnProperty(property)) continue;
                blocks.forEach(function (block) {
                    if (block.type != property) {
                        return;
                    }
                    var setupBlockRequired = blocksThatRequireSetup[property];

                    var noSetupBlock = blocks.filter(function (block) {
                            return block.type == setupBlockRequired;
                        }).length == 0;

                    var canNotStandAlone =
                        standAloneBlocks.indexOf(block.getRootBlock().type) == -1;

                    block.setDisabled(noSetupBlock || canNotStandAlone);
                })
            }
        }

        if (event.type == Blockly.Events.MOVE ||
            event.type == Blockly.Events.CREATE ||
            event.type == Blockly.Events.BLOCK_CHANGE) {
            var workspace = Blockly.Workspace.getById(event.workspaceId);
            var block = workspace.getBlockById(event.blockId);
            if (block) {
                var disableBlock =
                    standAloneBlocks.indexOf(block.getRootBlock().type) == -1;

                if (!disableBlock && blocksThatRequireSetup.hasOwnProperty(block.type)) {
                    var setupBlockRequired = blocksThatRequireSetup[block.type];

                    disableBlock = blocks.filter(function (block) {
                            return block.type == setupBlockRequired;
                        }).length == 0;

                }

                block.setDisabled(disableBlock);
                for (var i = 0; i < block.getChildren().length; i += 1) {
                    block.getChildren()[i].setDisabled(disableBlock);
                }
                if (setupBlocks.indexOf(block.type) > -1) {
                    for (var j = 0; j < blocks.length; j += 1) {
                        if (blocks[j].id != block.id && block.type == blocks[j].type) {
                            block.setDisabled(true);
                        }
                    }
                }
            }
        }

        if ((event.element == 'mutatorOpen' && !event.newValue) ||
            event.type == Blockly.Events.BLOCK_DELETE) {

            var variables = Blockly.mainWorkspace.getAllVariables();

            for (var key in variables) {
                if (variables.hasOwnProperty(key) && Blockly.mainWorkspace.getVariableUsesById(variables[key].getId()).length == 0) {
                    Blockly.mainWorkspace.deleteVariableById(variables[key].getId());
                }
            }
        }
    });

    // Responds to events that happen in the trashcan workspace
    Blockly.mainWorkspace.trashcan.flyout_.workspace_.addChangeListener(function(event) {

        var workspace = Blockly.Workspace.getById(event.workspaceId);
        var trashCan = Blockly.mainWorkspace.trashcan;

        // This handles removing items from the trash can
        // after they have been used
        if (event.type == Blockly.Events.UI) {

            // Deletes them once they have been used
            var block = workspace.getBlockById(event.newValue);
            var xml = Blockly.Xml.blockToDom(block);
            var cleanedXML = trashCan.cleanBlockXML_(xml);
            for (var i = 0; i < trashCan.contents_.length; i += 1) {
                var removeDisableStringFromBlock = trashCan.contents_[i].replace(/ disabled="true"/g, '');
                if (cleanedXML === removeDisableStringFromBlock) {
                    delete trashCan.contents_[i];
                }
            }

            // Re index item strings in the trash can
            var counter = 0;
            var contentsOfTrashCan = trashCan.contents_;
            var reIndexContents = [];
            contentsOfTrashCan.forEach(function(content) {
                reIndexContents[counter] = content;
                counter += 1;
            });
            trashCan.contents_ = reIndexContents;
            return;
        }

        // Makes sure all the blocks in the trash can are enabled.
        var allBlocks = workspace.getAllBlocks();
        allBlocks.forEach(function(block) {
            block.setDisabled(false);
        });
    });

    Blockly.mainWorkspace.registerToolboxCategoryCallback('LIST', function (workspace) {
        var xmlList = [];
        var btnCreateNumberList = document.createElement('button');
        btnCreateNumberList.setAttribute('text', 'Create a list of number');
        btnCreateNumberList.setAttribute('callbackKey', 'CREATE_NUMBER_LIST');
        workspace.registerButtonCallback('CREATE_NUMBER_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
                var createListNumberBlock = Blockly.mainWorkspace.newBlock('create_list_number_block');
                createListNumberBlock.initSvg();
                createListNumberBlock.render();
                createListNumberBlock.translate(-320, -170);
                createListNumberBlock.setDeletable(false);
            }, 'List Number');
        });
        xmlList.push(btnCreateNumberList);

        var btnCreateStringList = document.createElement('button');
        btnCreateStringList.setAttribute('text', 'Create a list of string');
        btnCreateStringList.setAttribute('callbackKey', 'CREATE_STRING_LIST');
        workspace.registerButtonCallback('CREATE_STRING_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
                var createListStringBlock = Blockly.mainWorkspace.newBlock('create_list_string_block');
                createListStringBlock.initSvg();
                createListStringBlock.render();
                createListStringBlock.translate(-320, -170);
                createListStringBlock.setDeletable(false);
            }, 'List String');
        });
        xmlList.push(btnCreateStringList);

        var btnCreateBooleanList = document.createElement('button');
        btnCreateBooleanList.setAttribute('text', 'Create a list of boolean');
        btnCreateBooleanList.setAttribute('callbackKey', 'CREATE_BOOLEAN_LIST');
        Blockly.mainWorkspace.registerButtonCallback('CREATE_BOOLEAN_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
                var createBooleanListBlock = Blockly.mainWorkspace.newBlock('create_list_boolean_block');
                createBooleanListBlock.initSvg();
                createBooleanListBlock.render();
                createBooleanListBlock.translate(-320, -170);
                createBooleanListBlock.setDeletable(false);
            }, 'List Boolean');
        });
        xmlList.push(btnCreateBooleanList);

        var btnCreateColorList = document.createElement('button');
        btnCreateColorList.setAttribute('text', 'Create a list of colors');
        btnCreateColorList.setAttribute('callbackKey', 'CREATE_COLOUR_LIST');
        Blockly.mainWorkspace.registerButtonCallback('CREATE_COLOUR_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
                var createColourListBlock = Blockly.mainWorkspace.newBlock('create_list_colour_block');
                createColourListBlock.initSvg();
                createColourListBlock.render();
                createColourListBlock.translate(-320, -170);
                createColourListBlock.setDeletable(false);
            }, 'List Colour');
        });
        xmlList.push(btnCreateColorList);

        var numberListVariables = workspace.getVariablesOfType('List Number');

        if (numberListVariables.length > 0) {
            var blockNumberListSetText = '<xml>' +
                '<block type="set_number_list_block" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(numberListVariables[0]) +
                '<value name="VALUE"> <block type="math_number"> <field name="NUM">10</field></block> </value>' +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockSetNumberList = Blockly.Xml.textToDom(blockNumberListSetText).firstChild;
            xmlList.push(blockSetNumberList);

            var blockTextGetListNum = '<xml>' +
                '<block type="get_number_from_list" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(numberListVariables[0]) +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockGetListNum = Blockly.Xml.textToDom(blockTextGetListNum).firstChild;
            xmlList.push(blockGetListNum);

        }

        var stringListVariables = workspace.getVariablesOfType('List String');

        if (stringListVariables.length > 0) {
            var blockStringListSetText = '<xml>' +
                '<block type="set_string_list_block" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(stringListVariables[0]) +
                '<value name="VALUE"> <block type="text"> <field name="TEXT">abc</field></block> </value>' +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockSetStringList = Blockly.Xml.textToDom(blockStringListSetText).firstChild;
            xmlList.push(blockSetStringList);

            var blockTextGetListText = '<xml>' +
                '<block type="get_string_from_list" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(stringListVariables[0]) +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockGetListText = Blockly.Xml.textToDom(blockTextGetListText).firstChild;
            xmlList.push(blockGetListText);


        }

        var booleanListVariables = workspace.getVariablesOfType('List Boolean');

        if (booleanListVariables.length > 0) {
            var blockBooleanListSetText = '<xml>' +
                '<block type="set_boolean_list_block" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(booleanListVariables[0]) +
                '<value name="VALUE"><block type="logic_boolean"></block></value>' +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockSetBooleanList = Blockly.Xml.textToDom(blockBooleanListSetText).firstChild;
            xmlList.push(blockSetBooleanList);

            var blockTextGetListBoolean = '<xml>' +
                '<block type="get_boolean_from_list" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(booleanListVariables[0]) +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockGetListBoolean = Blockly.Xml.textToDom(blockTextGetListBoolean).firstChild;
            xmlList.push(blockGetListBoolean);

        }

        var colourListVariables = workspace.getVariablesOfType('List Colour');

        if (colourListVariables.length > 0) {
            var blockColourListSetText = '<xml>' +
                '<block type="set_colour_list_block" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(colourListVariables[0]) +
                '<value name="VALUE"><block type="colour_picker"></block></value>' +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockColourListSet = Blockly.Xml.textToDom(blockColourListSetText).firstChild;
            xmlList.push(blockColourListSet);

            var blockTextGetListColor = '<xml>' +
                '<block type="get_colour_from_list" gap="24">' +
                Blockly.Variables.generateVariableFieldXmlString(colourListVariables[0]) +
                '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
                '</block>' +
                '</xml>';
            var blockGetListColor = Blockly.Xml.textToDom(blockTextGetListColor).firstChild;
            xmlList.push(blockGetListColor);

        }

        return xmlList;
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

    if (!navigator.onLine) {
        alert('Please connect to the internet and try again.');
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
        }, err => console.log(err, 'error'), () => console.log('finished'));
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

ipcRenderer.on(NODE_ERROR, (message) => {
    alert(message);
});

ipcRenderer.on('open:file', (event, content) => {
    Blockly.mainWorkspace.clear();
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(content));
});

ipcRenderer.on('get:code', () => {
    ipcRenderer.send('display:code', Blockly.Arduino.workspaceToCode(Blockly.mainWorkspace));
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
    console.log(blockNumber);
    const blocks = Blockly.mainWorkspace.getAllBlocks();

    for (let i = 0; i < blocks.length; i += 1) {
        if (blocks[i].id == blockNumber) {
            blocks[i].setColour("#000000");
            blocks[i].select();
            continue;
        }

        if (blocks[i].type === 'debug') {
            blocks[i].setColour(345);
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
            blocks[i].setColour(345);
        }
    }
}

