import * as Blockly from 'blockly/core';

Blockly.Variables.flyoutCategory = function(workspace) {
  let xmlList = [];
  const btnNumVariable = document.createElement('button');
  btnNumVariable.setAttribute('text', 'Create Number Variable');
  btnNumVariable.setAttribute('callbackKey', 'CREATE_NUM_VARIABLE');

  workspace.registerButtonCallback('CREATE_NUM_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      function(variableName) {
        if (variableName === null) {
          return;
        }
        const numVariableBlock = workspace.newBlock('variables_set_number');
        numVariableBlock.initSvg();
        numVariableBlock.render();

        const mathBlock = workspace.newBlock('math_number');
        mathBlock.setShadow(false);
        mathBlock.setFieldValue(32, 'NUM');
        mathBlock.initSvg();
        mathBlock.render();
        numVariableBlock
          .getInput('VALUE')
          .connection.connect(mathBlock.outputConnection);

        connectedCreatedVariableToStartBlock(numVariableBlock);
      },
      'Number'
    );
  });

  xmlList.push(btnNumVariable);

  const btnStringVariable = document.createElement('button');

  btnStringVariable.setAttribute('text', 'Create String Variable');
  btnStringVariable.setAttribute('callbackKey', 'CREATE_STRING_VARIABLE');

  workspace.registerButtonCallback('CREATE_STRING_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      function(variableName) {
        if (variableName === null) {
          return;
        }
        const stringVariableBlock = workspace.newBlock('variables_set_string');
        stringVariableBlock.initSvg();
        stringVariableBlock.render();

        const textBlock = workspace.newBlock('text');
        textBlock.setShadow(false);
        textBlock.setFieldValue('abc', 'TEXT');
        textBlock.initSvg();
        textBlock.render();
        stringVariableBlock
          .getInput('VALUE')
          .connection.connect(textBlock.outputConnection);

        connectedCreatedVariableToStartBlock(stringVariableBlock);
      },
      'String'
    );
  });

  xmlList.push(btnStringVariable);

  const btnBoolVariable = document.createElement('button');
  btnBoolVariable.setAttribute('text', 'Create Boolean Variable');
  btnBoolVariable.setAttribute('callbackKey', 'CREATE_BOOLEAN_VARIABLE');

  workspace.registerButtonCallback('CREATE_BOOLEAN_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      function(variableName) {
        if (variableName === null) {
          return;
        }
        const boolVariableBlock = workspace.newBlock('variables_set_boolean');
        boolVariableBlock.initSvg();
        boolVariableBlock.render();

        const boolBlock = workspace.newBlock('logic_boolean');
        boolBlock.setShadow(false);
        boolBlock.initSvg();
        boolBlock.render();
        boolVariableBlock
          .getInput('VALUE')
          .connection.connect(boolBlock.outputConnection);

        connectedCreatedVariableToStartBlock(boolVariableBlock);
      },
      'Boolean'
    );
  });

  xmlList.push(btnBoolVariable);

  const btnColourVariable = document.createElement('button');

  btnColourVariable.setAttribute('text', 'Create Color Variable');
  btnColourVariable.setAttribute('callbackKey', 'CREATE_COLOUR_VARIABLE');

  workspace.registerButtonCallback('CREATE_COLOUR_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(
      button.getTargetWorkspace(),
      function(variableName) {
        if (variableName === null) {
          return;
        }
        const colourVariableBlock = workspace.newBlock('variables_set_colour');
        colourVariableBlock.initSvg();
        colourVariableBlock.render();

        const colourBlock = workspace.newBlock('colour_picker');
        colourBlock.setShadow(false);
        colourBlock.initSvg();
        colourBlock.render();
        colourVariableBlock
          .getInput('VALUE')
          .connection.connect(colourBlock.outputConnection);

        connectedCreatedVariableToStartBlock(colourVariableBlock);
      },
      'Colour'
    );
  });

  xmlList.push(btnColourVariable);

  const blockList = Blockly.Variables.flyoutCategoryBlocks(workspace);
  xmlList = xmlList.concat(blockList);
  return xmlList;
};

Blockly.Variables.flyoutCategoryBlocks = function(workspace) {
  const numVariables = workspace.getVariablesOfType('Number');
  const stringVariables = workspace.getVariablesOfType('String');
  const boolVariables = workspace.getVariablesOfType('Boolean');
  const colourVariables = workspace.getVariablesOfType('Colour');
  const xmlSerializer = new XMLSerializer();

  const xmlList = [];
  if (numVariables.length > 0) {
    const blockTextSetNum =
      '<xml>' +
      '<block type="variables_set_number" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(numVariables[0])
      ) +
      '<value name="VALUE"> <block type="math_number"> <field name="NUM">10</field></block> </value>' +
      '</block>' +
      '</xml>';
    const blockSetNum = Blockly.Xml.textToDom(blockTextSetNum).firstChild;
    xmlList.push(blockSetNum);

    const blockTextGetNum =
      '<xml>' +
      '<block type="variables_get_number" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(numVariables[0])
      ) +
      '</block>' +
      '</xml>';
    const blockGetNum = Blockly.Xml.textToDom(blockTextGetNum).firstChild;
    xmlList.push(blockGetNum);
  }

  if (stringVariables.length > 0) {
    const blockTextSetString =
      '<xml>' +
      '<block type="variables_set_string" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(stringVariables[0])
      ) +
      '<value name="VALUE"> <block type="text"> <field name="TEXT">abc</field> </block> </value>' +
      '</block>' +
      '</xml>';
    const blockSetString = Blockly.Xml.textToDom(blockTextSetString).firstChild;

    xmlList.push(blockSetString);

    const blockTextGetString =
      '<xml>' +
      '<block type="variables_get_string" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(stringVariables[0])
      ) +
      '</block>' +
      '</xml>';
    const blockGetString = Blockly.Xml.textToDom(blockTextGetString).firstChild;
    xmlList.push(blockGetString);
  }

  if (boolVariables.length > 0) {
    const blockTextSetBool =
      '<xml>' +
      '<block type="variables_set_boolean" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(boolVariables[0])
      ) +
      '<value name="VALUE"> <block type="logic_boolean"> </block> </value>' +
      '</block>' +
      '</xml>';
    const blockSetBool = Blockly.Xml.textToDom(blockTextSetBool).firstChild;
    xmlList.push(blockSetBool);

    const blockTextGetBool =
      '<xml>' +
      '<block type="variables_get_boolean" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(boolVariables[0])
      ) +
      '</block>' +
      '</xml>';
    const blockGetBool = Blockly.Xml.textToDom(blockTextGetBool).firstChild;
    xmlList.push(blockGetBool);
  }

  if (colourVariables.length > 0) {
    const blockTextSetColour =
      '<xml>' +
      '<block type="variables_set_colour" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(colourVariables[0])
      ) +
      '<value name="VALUE"> <block type="colour_picker"> </block> </value>' +
      '</block>' +
      '</xml>';
    const blockSetColour = Blockly.Xml.textToDom(blockTextSetColour).firstChild;
    xmlList.push(blockSetColour);

    const blockTextGetColour =
      '<xml>' +
      '<block type="variables_get_colour" gap="24">' +
      xmlSerializer.serializeToString(
        Blockly.Variables.generateVariableFieldDom(colourVariables[0])
      ) +
      '</block>' +
      '</xml>';
    const blockGetColour = Blockly.Xml.textToDom(blockTextGetColour).firstChild;
    xmlList.push(blockGetColour);
  }
  return xmlList;
};

const connectedCreatedVariableToStartBlock = function(variableBlock) {
  const arduinoStartBlocks = Blockly.mainWorkspace
    .getTopBlocks()
    .filter(function(block) {
      return block.type === 'arduino_start';
    });

  if (arduinoStartBlocks.length === 0) {
    return;
  }
  const arduinoStartBlock = arduinoStartBlocks[0];

  const inputToAttachVariableTo = arduinoStartBlock
    .getInput('setup')
    .isVisible()
    ? 'setup'
    : 'loop';
  const parentConnection = arduinoStartBlock.getInput(inputToAttachVariableTo)
    .connection;
  parentConnection.connect(variableBlock.previousConnection);
};
