
const { virtualCircuitFactory } = require("../output/frontend/virtual-circuit/factory/virtual-circuit.factory");

const toolbox = document.getElementById('toolbox');
const { setupVideoPlayer } =
    require('../output/frontend/workspace/player-buttons.listeners');
const { framePlayer } =  require("../output/frontend/frame/frame_player.factory");
const _ = require('lodash');

/**
 * List of key value block type => setup block required
 */
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
    'temp_get_humidity': 'temp_setup',
    'set_color_led': 'setup_led_color'
};

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
    'bluetooth_setup',
    'setup_led_color'
];

const toggleDisableChildBlocks = (parentBlock, disable) => {
    parentBlock.setDisabled(disable);
    let nextBlock = parentBlock.getNextBlock();
    while(nextBlock) {
        nextBlock.setDisabled(disable);
        nextBlock = nextBlock.getNextBlock();
    }
};

const disableBlockForNotHavingRequiredSetupBlock = (blocks, testBlock) => {

   if (!blocksThatRequireSetup[testBlock.type]) {
       return false;
   }

   return  blocks
        .findIndex(potentialSetupBlock => {
            return potentialSetupBlock.type
                === blocksThatRequireSetup[testBlock.type]
        }) === -1;
};

Blockly.inject(document.getElementById('content-blocks'),
    {
        grid: {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        media: './media/',
        toolbox: toolbox,
    });


setTimeout(async () => {
    let xml = '<xml><block type="arduino_start" deletable="false" movable="true"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), Blockly.mainWorkspace);

    Blockly.mainWorkspace.getParentSvg().id = 'main-workspace-svg';

    window.vs = virtualCircuitFactory();
});

console.log('here here');




Blockly.mainWorkspace.addChangeListener(function (event) {


    if (event.element === 'disabled') {
        return;
    }

    const blocks = Blockly.mainWorkspace.getAllBlocks();
    const videoContainer = document.getElementById('video-controls-container');
    const isVideoModeOn = window.getComputedStyle(videoContainer).display !== 'none';

    // Toggle Debug Blocks
    blocks
        .filter(block => block.hasOwnProperty('defaultDebugValue'))
        .forEach(block => {
            if (isVideoModeOn) {
                block.debugModeOn();
            } else {
                block.debugModeOff();
            }
    });

    // Disables duplicate setup blocks
    blocks
        .filter(block => standAloneBlocks.includes(block.type))
        .forEach(setupBlock => {
            const disableSetupBlock = blocks.filter(block => block.type === setupBlock.type).length > 1;
            setupBlock.setDisabled(disableSetupBlock);
        });

    // Disables / Enables Blocks that don't have the required setup blocks
    blocks
        .filter(block => {
            // Exclude all stand alone blocks
            return !standAloneBlocks.includes(block.type);
        })
        .forEach(block => {

            if (disableBlockForNotHavingRequiredSetupBlock(blocks,block)) {
                block.setDisabled(true);
                toggleDisableChildBlocks(block, true);
                return;
            }

            // Means that the block is required to be inside a loop
            // We know this because it's not a stand alone block
            if (!standAloneBlocks.includes(block.getRootBlock().type)) {
                block.setDisabled(true);
                toggleDisableChildBlocks(block, true);
                return;
            }


            block.setDisabled(false);
            toggleDisableChildBlocks(block, false);

        });


    if ((event.type === Blockly.Events.MOVE ||
        event.type === Blockly.Events.CREATE ||
        event.type === Blockly.Events.BLOCK_CHANGE) && isVideoModeOn) {
        setupVideoPlayer(event);
    }

    if ((event.element === 'mutatorOpen' && !event.newValue) ||
        event.type === Blockly.Events.BLOCK_DELETE) {

        let variables = Blockly.mainWorkspace.getAllVariables();

        variables
            .filter(variable => {
               return Blockly
                        .mainWorkspace
                        .getVariableUsesById(variable.getId()).length === 0;
            })
            .forEach(variable => {
                Blockly.mainWorkspace.deleteVariableById(variable.getId())
            });
    }
});

// Responds to events that happen in the trashcan workspace
Blockly.mainWorkspace.trashcan.flyout_.workspace_.addChangeListener(function(event) {

    let workspace = Blockly.Workspace.getById(event.workspaceId);
    let trashCan = Blockly.mainWorkspace.trashcan;

    // This handles removing items from the trash can
    // after they have been used
    if (event.type === Blockly.Events.UI) {

        // Deletes them once they have been used
        let block = workspace.getBlockById(event.newValue);
        let xml = Blockly.Xml.blockToDom(block);
        let cleanedXML = trashCan.cleanBlockXML_(xml);
        for (let i = 0; i < trashCan.contents_.length; i += 1) {
            let removeDisableStringFromBlock = trashCan.contents_[i].replace(/ disabled="true"/g, '');
            if (cleanedXML === removeDisableStringFromBlock) {
                delete trashCan.contents_[i];
            }
        }

        // Re index item strings in the trash can
        let counter = 0;
        let contentsOfTrashCan = trashCan.contents_;
        let reIndexContents = [];
        contentsOfTrashCan.forEach(function(content) {
            reIndexContents[counter] = content;
            counter += 1;
        });
        trashCan.contents_ = reIndexContents;
        return;
    }

    // Makes sure all the blocks in the trash can are enabled.
    let allBlocks = workspace.getAllBlocks();
    allBlocks.forEach(function(block) {
        if (block.type === 'arduino_start') {
            block.dispose();
        } else {
            block.setDisabled(false);
        }
    });
});

/**
 * Crappy code to register the button listeners for blockly
 */
Blockly.mainWorkspace.registerToolboxCategoryCallback('LIST', function (workspace) {

    let xmlList = [];
    let btnCreateNumberList = document.createElement('button');
    btnCreateNumberList.setAttribute('text', 'Create a list of number');
    btnCreateNumberList.setAttribute('callbackKey', 'CREATE_NUMBER_LIST');

    workspace.registerButtonCallback('CREATE_NUMBER_LIST', function () {
        Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
            let createListNumberBlock = Blockly.mainWorkspace.newBlock('create_list_number_block');
            createListNumberBlock.initSvg();
            createListNumberBlock.render();
            createListNumberBlock.translate(-100, -100);
            createListNumberBlock.setDeletable(false);
        }, 'List Number');
    });

    xmlList.push(btnCreateNumberList);

    let btnCreateStringList = document.createElement('button');
    btnCreateStringList.setAttribute('text', 'Create a list of string');
    btnCreateStringList.setAttribute('callbackKey', 'CREATE_STRING_LIST');

    workspace.registerButtonCallback('CREATE_STRING_LIST', function () {
        Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
            let createListStringBlock = Blockly.mainWorkspace.newBlock('create_list_string_block');
            createListStringBlock.initSvg();
            createListStringBlock.render();
            createListStringBlock.translate(-100, -100);
            createListStringBlock.setDeletable(false);
        }, 'List String');
    });
    xmlList.push(btnCreateStringList);

    let btnCreateBooleanList = document.createElement('button');
    btnCreateBooleanList.setAttribute('text', 'Create a list of boolean');
    btnCreateBooleanList.setAttribute('callbackKey', 'CREATE_BOOLEAN_LIST');
    Blockly.mainWorkspace.registerButtonCallback('CREATE_BOOLEAN_LIST', function () {
        Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
            const createBooleanListBlock =
                Blockly.mainWorkspace.newBlock('create_list_boolean_block');
            createBooleanListBlock.initSvg();
            createBooleanListBlock.render();
            createBooleanListBlock.translate(-100, -100);
            createBooleanListBlock.setDeletable(false);
        }, 'List Boolean');
    });
    xmlList.push(btnCreateBooleanList);

    let btnCreateColorList = document.createElement('button');
    btnCreateColorList.setAttribute('text', 'Create a list of colors');
    btnCreateColorList.setAttribute('callbackKey', 'CREATE_COLOUR_LIST');
    Blockly.mainWorkspace.registerButtonCallback('CREATE_COLOUR_LIST', function () {
        Blockly.Variables.createVariableButtonHandler(Blockly.mainWorkspace, function () {
            let createColourListBlock = Blockly.mainWorkspace.newBlock('create_list_colour_block');
            createColourListBlock.initSvg();
            createColourListBlock.render();
            createColourListBlock.translate(-100, -100);
            createColourListBlock.setDeletable(false);
        }, 'List Colour');
    });
    xmlList.push(btnCreateColorList);

    let numberListVariables = workspace.getVariablesOfType('List Number');

    if (numberListVariables.length > 0) {
        let blockNumberListSetText = '<xml>' +
            '<block type="set_number_list_block" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(numberListVariables[0]) +
            '<value name="VALUE"> <block type="math_number"> <field name="NUM">10</field></block> </value>' +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockSetNumberList = Blockly.Xml.textToDom(blockNumberListSetText).firstChild;
        xmlList.push(blockSetNumberList);

        let blockTextGetListNum = '<xml>' +
            '<block type="get_number_from_list" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(numberListVariables[0]) +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockGetListNum = Blockly.Xml.textToDom(blockTextGetListNum).firstChild;
        xmlList.push(blockGetListNum);

    }

    let stringListVariables = workspace.getVariablesOfType('List String');

    if (stringListVariables.length > 0) {
        let blockStringListSetText = '<xml>' +
            '<block type="set_string_list_block" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(stringListVariables[0]) +
            '<value name="VALUE"> <block type="text"> <field name="TEXT">abc</field></block> </value>' +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockSetStringList = Blockly.Xml.textToDom(blockStringListSetText).firstChild;
        xmlList.push(blockSetStringList);

        let blockTextGetListText = '<xml>' +
            '<block type="get_string_from_list" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(stringListVariables[0]) +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockGetListText = Blockly.Xml.textToDom(blockTextGetListText).firstChild;
        xmlList.push(blockGetListText);


    }

    let booleanListVariables = workspace.getVariablesOfType('List Boolean');

    if (booleanListVariables.length > 0) {
        let blockBooleanListSetText = '<xml>' +
            '<block type="set_boolean_list_block" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(booleanListVariables[0]) +
            '<value name="VALUE"><block type="logic_boolean"></block></value>' +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockSetBooleanList = Blockly.Xml.textToDom(blockBooleanListSetText).firstChild;
        xmlList.push(blockSetBooleanList);

        let blockTextGetListBoolean = '<xml>' +
            '<block type="get_boolean_from_list" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(booleanListVariables[0]) +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockGetListBoolean = Blockly.Xml.textToDom(blockTextGetListBoolean).firstChild;
        xmlList.push(blockGetListBoolean);

    }

    let colourListVariables = workspace.getVariablesOfType('List Colour');

    if (colourListVariables.length > 0) {
        let blockColourListSetText = '<xml>' +
            '<block type="set_colour_list_block" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(colourListVariables[0]) +
            '<value name="VALUE"><block type="colour_picker"></block></value>' +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockColourListSet = Blockly.Xml.textToDom(blockColourListSetText).firstChild;
        xmlList.push(blockColourListSet);

        let blockTextGetListColor = '<xml>' +
            '<block type="get_colour_from_list" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(colourListVariables[0]) +
            '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
            '</block>' +
            '</xml>';
        let blockGetListColor = Blockly.Xml.textToDom(blockTextGetListColor).firstChild;
        xmlList.push(blockGetListColor);

    }

    return xmlList;
});
