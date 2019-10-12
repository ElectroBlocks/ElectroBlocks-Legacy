import * as Blockly from 'blockly/core';
/**
 * Crappy code to register the button listeners for blockly
 */

export const registerListMenu = (workspace: Blockly.Workspace) => {
  workspace.registerToolboxCategoryCallback('LIST', workspace => {
    let xmlList = [];
    let btnCreateNumberList = document.createElement('button');
    btnCreateNumberList.setAttribute('text', 'Create a list of number');
    btnCreateNumberList.setAttribute('callbackKey', 'CREATE_NUMBER_LIST');
    const xmlSerializer = new XMLSerializer();
    workspace.registerButtonCallback('CREATE_NUMBER_LIST', () => {
      Blockly.Variables.createVariableButtonHandler(
        workspace,
        variableName => {
          if (variableName === null) {
            return;
          }
          let createListNumberBlock = workspace.newBlock(
            'create_list_number_block'
          );
          createListNumberBlock.initSvg();
          createListNumberBlock.render();
          createListNumberBlock.translate(20, 20);
          createListNumberBlock.setDeletable(false);
        },
        'List Number'
      );
    });

    xmlList.push(btnCreateNumberList);

    let btnCreateStringList = document.createElement('button');
    btnCreateStringList.setAttribute('text', 'Create a list of string');
    btnCreateStringList.setAttribute('callbackKey', 'CREATE_STRING_LIST');

    workspace.registerButtonCallback('CREATE_STRING_LIST', () => {
      Blockly.Variables.createVariableButtonHandler(
        workspace,
        variableName => {
          if (variableName === null) {
            return;
          }
          let createListStringBlock = workspace.newBlock(
            'create_list_string_block'
          );
          createListStringBlock.initSvg();
          createListStringBlock.render();
          createListStringBlock.translate(20, 20);
          createListStringBlock.setDeletable(false);
        },
        'List String'
      );
    });
    xmlList.push(btnCreateStringList);

    let btnCreateBooleanList = document.createElement('button');
    btnCreateBooleanList.setAttribute('text', 'Create a list of boolean');
    btnCreateBooleanList.setAttribute('callbackKey', 'CREATE_BOOLEAN_LIST');
    workspace.registerButtonCallback('CREATE_BOOLEAN_LIST', () => {
      Blockly.Variables.createVariableButtonHandler(
        workspace,
        variableName => {
          if (variableName === null) {
            return;
          }
          const createBooleanListBlock = workspace.newBlock(
            'create_list_boolean_block'
          );
          createBooleanListBlock.initSvg();
          createBooleanListBlock.render();
          createBooleanListBlock.translate(20, 20);
          createBooleanListBlock.setDeletable(false);
        },
        'List Boolean'
      );
    });
    xmlList.push(btnCreateBooleanList);

    let btnCreateColorList = document.createElement('button');
    btnCreateColorList.setAttribute('text', 'Create a list of colors');
    btnCreateColorList.setAttribute('callbackKey', 'CREATE_COLOUR_LIST');
    workspace.registerButtonCallback('CREATE_COLOUR_LIST', () => {
      Blockly.Variables.createVariableButtonHandler(
        workspace,
        variableName => {
          if (variableName === null) {
            return;
          }
          let createColourListBlock = workspace.newBlock(
            'create_list_colour_block'
          );
          createColourListBlock.initSvg();
          createColourListBlock.render();
          createColourListBlock.translate(20, 20);
          createColourListBlock.setDeletable(false);
        },
        'List Colour'
      );
    });
    xmlList.push(btnCreateColorList);

    let numberListVariables = workspace.getVariablesOfType('List Number');

    if (numberListVariables.length > 0) {
      let blockNumberListSetText =
        '<xml>' +
        '<block type="set_number_list_block" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(numberListVariables[0])
        ) +
        '<value name="VALUE"> <block type="math_number"> <field name="NUM">10</field></block> </value>' +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockSetNumberList = Blockly.Xml.textToDom(blockNumberListSetText)
        .firstChild;
      xmlList.push(blockSetNumberList);

      let blockTextGetListNum =
        '<xml>' +
        '<block type="get_number_from_list" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(numberListVariables[0])
        ) +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockGetListNum = Blockly.Xml.textToDom(blockTextGetListNum)
        .firstChild;
      xmlList.push(blockGetListNum);
    }

    let stringListVariables = workspace.getVariablesOfType('List String');

    if (stringListVariables.length > 0) {
      let blockStringListSetText =
        '<xml>' +
        '<block type="set_string_list_block" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(stringListVariables[0])
        ) +
        '<value name="VALUE"> <block type="text"> <field name="TEXT">abc</field></block> </value>' +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockSetStringList = Blockly.Xml.textToDom(blockStringListSetText)
        .firstChild;
      xmlList.push(blockSetStringList);

      let blockTextGetListText =
        '<xml>' +
        '<block type="get_string_from_list" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(stringListVariables[0])
        ) +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockGetListText = Blockly.Xml.textToDom(blockTextGetListText)
        .firstChild;
      xmlList.push(blockGetListText);
    }

    let booleanListVariables = workspace.getVariablesOfType('List Boolean');

    if (booleanListVariables.length > 0) {
      let blockBooleanListSetText =
        '<xml>' +
        '<block type="set_boolean_list_block" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(booleanListVariables[0])
        ) +
        '<value name="VALUE"><block type="logic_boolean"></block></value>' +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockSetBooleanList = Blockly.Xml.textToDom(blockBooleanListSetText)
        .firstChild;
      xmlList.push(blockSetBooleanList);

      let blockTextGetListBoolean =
        '<xml>' +
        '<block type="get_boolean_from_list" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(booleanListVariables[0])
        ) +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockGetListBoolean = Blockly.Xml.textToDom(blockTextGetListBoolean)
        .firstChild;
      xmlList.push(blockGetListBoolean);
    }

    let colourListVariables = workspace.getVariablesOfType('List Colour');

    if (colourListVariables.length > 0) {
      let blockColourListSetText =
        '<xml>' +
        '<block type="set_colour_list_block" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(colourListVariables[0])
        ) +
        '<value name="VALUE"><block type="colour_picker"></block></value>' +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockColourListSet = Blockly.Xml.textToDom(blockColourListSetText)
        .firstChild;
      xmlList.push(blockColourListSet);

      let blockTextGetListColor =
        '<xml>' +
        '<block type="get_colour_from_list" gap="24">' +
        xmlSerializer.serializeToString(
          Blockly.Variables.generateVariableFieldDom(colourListVariables[0])
        ) +
        '<value name="POSITION"> <block type="math_number"> <field name="NUM">1</field></block> </value>' +
        '</block>' +
        '</xml>';
      let blockGetListColor = Blockly.Xml.textToDom(blockTextGetListColor)
        .firstChild;
      xmlList.push(blockGetListColor);
    }

    return xmlList;
  });
};
