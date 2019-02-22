
/**
 * Construct the blocks required by the flyout for the procedure category.
 * @param {!Blockly.Workspace} workspace The workspace containing procedures.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Procedures.flyoutCategory = function(workspace) {
    var xmlList = [];
    if (Blockly.Blocks['procedures_defnoreturn']) {
        // <block type="procedures_defnoreturn" gap="16">
        //     <field name="NAME">do something</field>
        // </block>
        var block = Blockly.Xml.utils.createElement('block');
        block.setAttribute('type', 'procedures_defnoreturn');
        block.setAttribute('gap', 16);
        var nameField = Blockly.Xml.utils.createElement('field');
        nameField.setAttribute('name', 'NAME');
        nameField.appendChild(Blockly.Xml.utils.createTextNode(
            Blockly.Msg['PROCEDURES_DEFNORETURN_PROCEDURE']));
        block.appendChild(nameField);
        xmlList.push(block);
    }


    // MORE NOW COMMENTING THIS OUT FOR DEBUG
    // HAVE NOT RAN INTO A SITUATION YET THAT REQUIRES RETURN TYPE
    // POSSIBLE VERSION 4
    // if (Blockly.Blocks['procedures_defreturn']) {
    //     // <block type="procedures_defreturn" gap="16">
    //     //     <field name="NAME">do something</field>
    //     // </block>
    //     var block = Blockly.Xml.utils.createElement('block');
    //     block.setAttribute('type', 'procedures_defreturn');
    //     block.setAttribute('gap', 16);
    //     var nameField = Blockly.Xml.utils.createElement('field');
    //     nameField.setAttribute('name', 'NAME');
    //     nameField.appendChild(Blockly.Xml.utils.createTextNode(
    //         Blockly.Msg['PROCEDURES_DEFRETURN_PROCEDURE']));
    //     block.appendChild(nameField);
    //     xmlList.push(block);
    // }


    if (xmlList.length) {
        // Add slightly larger gap between system blocks and user calls.
        xmlList[xmlList.length - 1].setAttribute('gap', 24);
    }

    function populateProcedures(procedureList, templateName) {
        for (var i = 0; i < procedureList.length; i++) {
            var name = procedureList[i][0];
            var argsModel = procedureList[i][3]; //  CHANGING TO SUPPORT TYPES
            // <block type="procedures_callnoreturn" gap="16">
            //   <mutation name="do something">
            //     <arg name="x" type="Nubmer"></arg>
            //   </mutation>
            // </block>
            var block = Blockly.Xml.utils.createElement('block');
            block.setAttribute('type', templateName);
            block.setAttribute('gap', 40);
            var mutation = Blockly.Xml.utils.createElement('mutation');
            mutation.setAttribute('name', name);
            block.appendChild(mutation);
            for (var j = 0; j < argsModel.length; j++) {
                var arg = Blockly.Xml.utils.createElement('arg');
                arg.setAttribute('name', argsModel[j].name);
                arg.setAttribute('type', argsModel[j].type); // CHANGE TO GET TYPES
                mutation.appendChild(arg);
            }
            xmlList.push(block);
        }
    }

    var tuple = Blockly.Procedures.allProcedures(workspace);
    populateProcedures(tuple[0], 'procedures_callnoreturn');
    populateProcedures(tuple[1], 'procedures_callreturn');
    return xmlList;
};



/**
 * Construct the elements (blocks and button) required by the flyout for the
 * variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML elements.
 */
Blockly.Variables.flyoutCategory = function (workspace) {
    var xmlList = [];
    var btnNumVariable = document.createElement('button');
    btnNumVariable.setAttribute('text', 'Create Number Variable');
    btnNumVariable.setAttribute('callbackKey', 'CREATE_NUM_VARIABLE');

    workspace.registerButtonCallback('CREATE_NUM_VARIABLE', function (button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), function () {
            var numVariableBlock = workspace.newBlock('variables_set_number');
            numVariableBlock.initSvg();
            numVariableBlock.render();

            var mathBlock = workspace.newBlock('math_number');
            mathBlock.setShadow(false);
            mathBlock.setFieldValue(32, 'NUM');
            mathBlock.initSvg();
            mathBlock.render();
            numVariableBlock.getInput('VALUE').connection.connect(mathBlock.outputConnection);

            Blockly.Variables.connectedCreatedVariableToStartBlock(numVariableBlock);

        }, 'Number');
    });

    xmlList.push(btnNumVariable);

    var btnStringVariable = document.createElement('button');

    btnStringVariable.setAttribute('text', 'Create String Variable');
    btnStringVariable.setAttribute('callbackKey', 'CREATE_STRING_VARIABLE');

    workspace.registerButtonCallback('CREATE_STRING_VARIABLE', function (button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), function () {
            var stringVariableBlock = workspace.newBlock('variables_set_string');
            stringVariableBlock.initSvg();
            stringVariableBlock.render();

            var textBlock = workspace.newBlock('text');
            textBlock.setShadow(false);
            textBlock.setFieldValue('abc', 'TEXT');
            textBlock.initSvg();
            textBlock.render();
            stringVariableBlock.getInput('VALUE').connection.connect(textBlock.outputConnection);

            Blockly.Variables.connectedCreatedVariableToStartBlock(stringVariableBlock);

        }, 'String');
    });

    xmlList.push(btnStringVariable);

    var btnBoolVariable = document.createElement('button');
    btnBoolVariable.setAttribute('text', 'Create Boolean Variable');
    btnBoolVariable.setAttribute('callbackKey', 'CREATE_BOOLEAN_VARIABLE');

    workspace.registerButtonCallback('CREATE_BOOLEAN_VARIABLE', function (button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), function () {
            var boolVariableBlock = workspace.newBlock('variables_set_boolean');
            boolVariableBlock.initSvg();
            boolVariableBlock.render();

            var boolBlock = workspace.newBlock('logic_boolean');
            boolBlock.setShadow(false);
            boolBlock.initSvg();
            boolBlock.render();
            boolVariableBlock.getInput('VALUE').connection.connect(boolBlock.outputConnection);

            Blockly.Variables.connectedCreatedVariableToStartBlock(boolVariableBlock);

        }, 'Boolean');

    });

    xmlList.push(btnBoolVariable);

    var btnColourVariable = document.createElement('button');

    btnColourVariable.setAttribute('text', 'Create Color Variable');
    btnColourVariable.setAttribute('callbackKey', 'CREATE_COLOUR_VARIABLE');

    workspace.registerButtonCallback('CREATE_COLOUR_VARIABLE', function (button) {
        Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), function () {
            var colourVariableBlock = workspace.newBlock('variables_set_colour');
            colourVariableBlock.initSvg();
            colourVariableBlock.render();

            var colourBlock = workspace.newBlock('colour_picker');
            colourBlock.setShadow(false);
            colourBlock.initSvg();
            colourBlock.render();
            colourVariableBlock.getInput('VALUE').connection.connect(colourBlock.outputConnection);

            Blockly.Variables.connectedCreatedVariableToStartBlock(colourVariableBlock);

        }, 'Colour');

    });

    xmlList.push(btnColourVariable);

    var blockList = Blockly.Variables.flyoutCategoryBlocks(workspace);
    xmlList = xmlList.concat(blockList);
    return xmlList;
};

Blockly.Variables.connectedCreatedVariableToStartBlock = function (variableBlock) {
    var arduinoStartBlocks = Blockly.mainWorkspace.getTopBlocks().filter(function(block) {
        return block.type == 'arduino_start';
    });

    if (arduinoStartBlocks.length == 0) {
        return;
    }

    var arduinoStartBlock = arduinoStartBlocks[0];
    var parentConnection = arduinoStartBlock.getInput('setup').connection;
    parentConnection.connect(variableBlock.previousConnection);
};


/**
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace containing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
Blockly.Variables.flyoutCategoryBlocks = function (workspace) {

    var numVariables = workspace.getVariablesOfType('Number');
    var stringVariables = workspace.getVariablesOfType('String');
    var boolVariables = workspace.getVariablesOfType('Boolean');
    var colourVariables = workspace.getVariablesOfType('Colour');

    var xmlList = [];
    if (numVariables.length > 0) {

        var blockTextSetNum = '<xml>' +
            '<block type="variables_set_number" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(numVariables[0]) +
            '<value name="VALUE"> <block type="math_number"> <field name="NUM">10</field></block> </value>' +
            '</block>' +
            '</xml>';
        var blockSetNum = Blockly.Xml.textToDom(blockTextSetNum).firstChild;
        xmlList.push(blockSetNum);

        var blockTextGetNum = '<xml>' +
            '<block type="variables_get_number" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(numVariables[0]) +
            '</block>' +
            '</xml>';
        var blockGetNum = Blockly.Xml.textToDom(blockTextGetNum).firstChild;
        xmlList.push(blockGetNum);
    }

    if (stringVariables.length > 0) {

        var blockTextSetString = '<xml>' +
            '<block type="variables_set_string" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(stringVariables[0]) +
            '<value name="VALUE"> <block type="text"> <field name="TEXT">abc</field> </block> </value>' +
            '</block>' +
            '</xml>';
        var blockSetString = Blockly.Xml.textToDom(blockTextSetString).firstChild;

        xmlList.push(blockSetString);

        var blockTextGetString = '<xml>' +
            '<block type="variables_get_string" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(stringVariables[0]) +
            '</block>' +
            '</xml>';
        var blockGetString = Blockly.Xml.textToDom(blockTextGetString).firstChild;
        xmlList.push(blockGetString);
    }

    if (boolVariables.length > 0) {

        var blockTextSetBool = '<xml>' +
            '<block type="variables_set_boolean" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(boolVariables[0]) +
            '<value name="VALUE"> <block type="logic_boolean"> </block> </value>' +
            '</block>' +
            '</xml>';
        var blockSetBool = Blockly.Xml.textToDom(blockTextSetBool).firstChild;
        xmlList.push(blockSetBool);

        var blockTextGetBool = '<xml>' +
            '<block type="variables_get_boolean" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(boolVariables[0]) +
            '</block>' +
            '</xml>';
        var blockGetBool = Blockly.Xml.textToDom(blockTextGetBool).firstChild;
        xmlList.push(blockGetBool);
    }

    if (colourVariables.length > 0) {

        var blockTextSetColour = '<xml>' +
            '<block type="variables_set_colour" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(colourVariables[0]) +
            '<value name="VALUE"> <block type="colour_picker"> </block> </value>' +
            '</block>' +
            '</xml>';
        var blockSetColour = Blockly.Xml.textToDom(blockTextSetColour).firstChild;
        xmlList.push(blockSetColour);

        var blockTextGetColour = '<xml>' +
            '<block type="variables_get_colour" gap="24">' +
            Blockly.Variables.generateVariableFieldXmlString(colourVariables[0]) +
            '</block>' +
            '</xml>';
        var blockGetColour = Blockly.Xml.textToDom(blockTextGetColour).firstChild;
        xmlList.push(blockGetColour);
    }

    return xmlList;
};