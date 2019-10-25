import * as Blockly from 'blockly/core';

Blockly.Blocks['procedures_defnoreturn'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    const nameField = new Blockly.FieldTextInput('', Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
      .appendField('Create block')
      .appendField(nameField, 'NAME')
      .appendField('', 'PARAMS');
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (
      (this.workspace.options.comments ||
        (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
      Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']
    ) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
    }
    this.setColour(Blockly.Msg['PROCEDURES_HUE']);
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this Blockly.Block
   */
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK').appendField(
        Blockly.Msg['PROCEDURES_DEFNORETURN_DO']
      );
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  /**
   * Update the display of parameters for this procedure definition block.
   * Display a warning if there are duplicate named parameters.
   * @private
   * @this Blockly.Block
   */
  updateParams_: function() {
    // Check for duplicated arguments.
    let badArg = false;
    const hash = {};
    for (let i = 0; i < this.arguments_.length; i++) {
      if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[i].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.Msg['PROCEDURES_DEF_DUPLICATE_WARNING']);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    let paramString = '';
    const paramStringArgs = [];
    if (this.argumentVarModels_.length) {
      for (let ii = 0; ii < this.argumentVarModels_.length; ii += 1) {
        paramStringArgs.push(
          '  ' +
            this.argumentVarModels_[ii].name +
            ' (' +
            this.argumentVarModels_[ii].type +
            ')'
        );
      }
      paramString =
        Blockly.Msg['PROCEDURES_BEFORE_PARAMS'] + paramStringArgs.join(', ');
    }
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    try {
      this.setFieldValue(paramString, 'PARAMS');
    } finally {
      Blockly.Events.enable();
    }
  },
  /**
   * Create XML to represent the argument inputs.
   * @param {boolean=} opt_paramIds If true include the IDs of the parameter
   *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function(opt_paramIds) {
    const container = document.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      const parameter = document.createElement('arg');
      const argModel = this.argumentVarModels_[i];
      parameter.setAttribute('name', argModel.name);
      parameter.setAttribute('type', argModel.type); // NOTES Setting the type of variable here
      parameter.setAttribute('varid', argModel.getId());
      if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
      container.appendChild(parameter);
    }

    if (this.getFieldValue('RETURN TYPE')) {
      container.setAttribute('return_type', this.getFieldValue('RETURN TYPE'));
    }

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute('statements', 'false');
    }

    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    for (let i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() === 'arg') {
        const varName = childNode.getAttribute('name');
        const type = childNode.getAttribute('type');
        //  NOTES GETTING THE TYPE OF VARIABLE
        const varId = childNode.getAttribute('varid');
        this.arguments_.push(varName);
        const variable = Blockly.Variables.getOrCreateVariablePackage(
          this.workspace,
          varId,
          varName,
          type
        );
        this.argumentVarModels_.push(variable);
      }
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('procedures_mutatorcontainer');
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    if (this.getInput('RETURN')) {
      containerBlock.setFieldValue(
        this.hasStatements_ ? 'TRUE' : 'FALSE',
        'STATEMENTS'
      );
    } else {
      containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
    }

    // Parameter list.
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.arguments_.length; i++) {
      const paramBlock = workspace.newBlock('procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.arguments_[i], 'NAME');
      paramBlock.setFieldValue(this.argumentVarModels_[i].type, 'TYPE');
      // Trying to add type back
      // Store the old location.
      paramBlock.oldLocation = i;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
    this.paramIds_ = [];
    this.argumentVarModels_ = [];
    let paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      const varName = paramBlock.getFieldValue('NAME');
      this.arguments_.push(varName);
      const variable = this.workspace.getVariable(
        varName,
        paramBlock.getFieldValue('TYPE') // NOTES SETTING TYPE OF VARIABLE
      );

      this.argumentVarModels_.push(variable);
      this.paramIds_.push(paramBlock.id);
      paramBlock =
        paramBlock.nextConnection && paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show/hide the statement input.
    let hasStatements = containerBlock.getFieldValue('STATEMENTS');
    if (hasStatements !== null) {
      hasStatements = hasStatements === 'TRUE';
      if (this.hasStatements_ !== hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          const stackConnection = this.getInput('STACK').connection;
          this.statementConnection_ = stackConnection.targetConnection;
          if (this.statementConnection_) {
            const stackBlock = stackConnection.targetBlock();
            stackBlock.unplug();
            stackBlock.bumpNeighbours_();
          }
          this.setStatements_(false);
        }
      }
    }
  },

  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES NOT have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [
      this.getFieldValue('NAME'),
      this.arguments_,
      false,
      this.argumentVarModels_
    ];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return this.arguments_;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this Blockly.Block
   */
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  /**
   * Notification that a variable is renaming.
   * If the ID matches one of this block's variables, rename it.
   * @param {string} oldId ID of variable to rename.
   * @param {string} newId ID of new variable.  May be the same as oldId, but
   *     with an updated name.  Guaranteed to be the same type as the old
   *     variable.
   * @override
   * @this Blockly.Block
   */
  renameVarById: function(oldId, newId) {
    const oldVariable = this.workspace.getVariableById(oldId);
    if (oldVariable.type !== '') {
      // Procedure arguments always have the empty type.
      return;
    }
    const oldName = oldVariable.name;
    const newVar = this.workspace.getVariableById(newId);

    let change = false;
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() === oldId) {
        this.arguments_[i] = newVar.name;
        this.argumentVarModels_[i] = newVar;
        change = true;
      }
    }
    if (change) {
      this.displayRenamedVar_(oldName, newVar.name);
    }
  },
  /**
   * Notification that a variable is renaming but keeping the same ID.  If the
   * variable is in use on this block, rerender to show the new name.
   * @param {!Blockly.VariableModel} variable The variable being renamed.
   * @package
   * @override
   * @this Blockly.Block
   */
  updateVarName: function(variable) {
    let oldName;
    const newName = variable.name;
    let change = false;
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() === variable.getId()) {
        oldName = this.arguments_[i];
        this.arguments_[i] = newName;
        change = true;
      }
    }
    if (change) {
      this.displayRenamedVar_(oldName, newName);
    }
  },
  /**
   * Update the display to reflect a newly renamed argument.
   * @param {string} oldName The old display name of the argument.
   * @param {string} newName The new display name of the argument.
   * @private
   */
  displayRenamedVar_: function(oldName, newName) {
    this.updateParams_();
    // Update the mutator's variables if the mutator is open.
    if (this.mutator.isVisible()) {
      const blocks = this.mutator.workspace_.getAllBlocks(false);
      for (let i = 0, block; (block = blocks[i]); i++) {
        if (
          block.type === 'procedures_mutatorarg' &&
          Blockly.Names.equals(oldName, block.getFieldValue('NAME'))
        ) {
          block.setFieldValue(newName, 'NAME');
        }
      }
    }
  },
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    if (this.isInFlyout) {
      return;
    }
    // Add option to create caller.
    const option: any = { enabled: true };
    const name = this.getFieldValue('NAME');
    option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
    const xmlMutation = document.createElement('mutation');
    xmlMutation.setAttribute('name', name);
    for (let i = 0; i < this.arguments_.length; i++) {
      const xmlArg = document.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlArg.setAttribute('type', this.argumentVarModels_[i].type); // TYPE FIGURED OUT
      xmlMutation.appendChild(xmlArg);
    }
    const xmlBlock = document.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (let i = 0; i < this.argumentVarModels_.length; i++) {
        const option: any = { enabled: true };
        const argVar = this.argumentVarModels_[i];
        const name = argVar.name;
        option.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace(
          '%1',
          name
        );

        const xmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        const xmlBlock = document.createElement('block');
        xmlBlock.setAttribute('type', 'variables_get');
        xmlBlock.appendChild(xmlField);
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },
  callType_: 'procedures_callnoreturn'
};

Blockly.Blocks['procedures_defreturn'] = {
  /**
   * Block for defining a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    const returnTypeField = new Blockly.FieldDropdown(
      [
        ['Number', 'Number'],
        ['String', 'String'],
        ['Boolean', 'Boolean'],
        ['List Number', 'List Number'],
        ['List String', 'List String'],
        ['List Boolean', 'List Boolean']
      ],
      this.updateReturnType.bind(this)
    );

    const nameField = new Blockly.FieldTextInput('', Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
      .appendField('Create block')
      .appendField(nameField, 'NAME')
      .appendField('', 'PARAMS')
      .appendField('that returns: ')
      .appendField(returnTypeField, 'RETURN TYPE');

    this.appendValueInput('RETURN')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (
      (this.workspace.options.comments ||
        (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
      Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']
    ) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
    }
    this.setColour(Blockly.Msg['PROCEDURES_HUE']);
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
    // Start the return the type off as a number.
    this.updateReturnType('Number');
  },
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [
      this.getFieldValue('NAME'),
      this.arguments_,
      true,
      this.argumentVarModels_
    ];
  },

  /**
   * This will update all update the return type on the block and will update all the callers for the i
   *
   * @param returnType The type that is being checked
   */
  updateReturnType: function(returnType) {
    const returnInput = this.getInput('RETURN');

    if (!returnInput) {
      return;
    }

    returnInput.setCheck([returnType]);

    if (
      returnInput.connection &&
      returnInput.connection.getCheck().indexOf(returnType) === -1
    ) {
      returnInput.connection.disconnect();
      returnInput.connection.bumpNeighbours_();
    }

    const callers = Blockly.Procedures.getCallers(
      this.getFieldValue('NAME'),
      this.workspace
    );

    for (let i = 0, caller; (caller = callers[i]); i++) {
      caller.setOutput(true, returnType);
      const parent = caller.getParent();
      if (parent) {
        const input = parent.getInputWithBlock(caller);
        if (
          input.connection.getCheck() !== null &&
          input.connection.getCheck().indexOf(returnType) === -1
        ) {
          input.connection.disconnect();
          input.connection.bumpNeighbours_();
        }
      }
    }
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
  renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
  updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
  displayRenamedVar_:
    Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
  customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
  callType_: 'procedures_callreturn'
};

Blockly.Blocks['procedures_mutatorcontainer'] = {
  /**
   * Mutator block for procedure container.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput().appendField(
      Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TITLE']
    );
    this.appendStatementInput('STACK');
    this.appendDummyInput('STATEMENT_INPUT')
      .appendField(Blockly.Msg['PROCEDURES_ALLOW_STATEMENTS'])
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
    this.setColour(Blockly.Msg['PROCEDURES_HUE']);
    this.setTooltip(Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TOOLTIP']);
    this.contextMenu = false;
  }
};

let parameterCounter = 1;

Blockly.Blocks['procedures_mutatorarg'] = {
  /**
   * Mutator block for procedure argument.
   * @this Blockly.Block
   */
  init: function() {
    const paramName = 'param' + parameterCounter.toString();

    // This is for dialog box that get's opened
    // It has a flyout menu with the default variable
    // This will set the name of that default variable
    if (this.workspace.flyout_) {
      this.workspace.flyout_.workspace_
        .getAllBlocks()[0]
        .setFieldValue(paramName, 'NAME');
    }

    const typeField = new Blockly.FieldDropdown(
      [
        ['Number', 'Number'],
        ['String', 'String'],
        ['Boolean', 'Boolean'],
        ['List Number', 'List Number'],
        ['List String', 'List String'],
        ['List Boolean', 'List Boolean']
      ],
      this.validatorType_.bind(this)
    );
    const nameField = new Blockly.FieldTextInput(
      paramName,
      this.validateName.bind(this)
    );
    // Hack: override showEditor to do just a little bit more work.
    // We don't have a good place to hook into the start of a text edit.
    nameField.oldShowEditorFn_ = nameField.showEditor_;
    const newShowEditorFn = function() {
      this.createdVariables_ = [];
      this.oldShowEditorFn_();
    };

    nameField.showEditor_ = newShowEditorFn;

    this.appendDummyInput()
      .appendField(Blockly.Msg['PROCEDURES_MUTATORARG_TITLE'])
      .appendField(nameField, 'NAME')
      .appendField(typeField, 'TYPE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Msg['PROCEDURES_HUE']);
    this.setTooltip(Blockly.Msg['PROCEDURES_MUTATORARG_TOOLTIP']);
    this.contextMenu = false;

    // Create the default variable when we drag the block in from the flyout.
    // Have to do this after installing the field on the block.
    nameField.onFinishEditing_ = this.deleteIntermediateVars_.bind(this);
    // Create an empty list so onFinishEditing_ has something to look at, even
    // though the editor was never opened.
    this.createdVariables_ = [];
    nameField.onFinishEditing_(paramName);
    parameterCounter += 1;
  },
  /**
   * Obtain a valid name for the procedure argument. Create a variable if
   * necessary.
   * Merge runs of whitespace.  Strip leading and trailing whitespace.
   * Beyond this, all names are legal.
   * @param {string} varName User-supplied name.
   * @return {?string} Valid name, or null if a name was not specified.
   * @private
   */
  validateName: function(varName) {
    this.validateVariable(varName, this.getFieldValue('TYPE'));

    varName = varName.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');

    if (!varName) {
      return null;
    }

    const blocks = this.workspace.getAllBlocks();

    for (let i = 0; i < blocks.length; i += 1) {
      if (blocks[i].id === this.id) {
        continue;
      }
      if (blocks[i].getFieldValue('NAME') === varName) {
        return null;
      }
    }

    return varName;
  },

  /**
   * This will add a variable to the list variables in the main workspace
   * @param varType
   * @private
   */
  validatorType_: function(varType) {
    this.validateVariable(this.getFieldValue('NAME'), varType);

    return varType;
  },

  /**
   * This will validate the variable being used
   *
   * @param varName
   * @param varType
   * @return {*}
   */
  validateVariable: function(varName, varType) {
    varName = varName.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');

    if (!varName) {
      return null;
    }

    const outerWs = Blockly.mainWorkspace;
    let model = outerWs.getVariable(varName, varType);
    // CHANGING VARIABLE NAME TO REFLECT TYPE
    if (model && model.name !== varName) {
      // Rename the variable (case change)
      outerWs.renameVarById(model.getId(), varName);
    }

    if (!model) {
      model = outerWs.createVariable(varName, varType);
      // CHANGING VARIABLE NAME TO REFLECT TYPE
      if (model && this.createdVariables_) {
        this.createdVariables_.push(model);
      }
    }
  },

  /**
   * Called when focusing away from the text field.
   * Deletes all variables that were created as the user typed their intended
   * variable name.
   * @private
   */
  deleteIntermediateVars_: function(varName, varType) {
    varName = varName || this.getFieldValue('NAME');
    varType = varType || this.getFieldValue('TYPE');

    const outerWs = Blockly.mainWorkspace;
    if (!outerWs) {
      return;
    }
    for (let i = 0; i < this.createdVariables_.length; i++) {
      const model = this.createdVariables_[i];
      if (model.name !== varName || model.type !== varType) {
        //  DELETE CRITERIA NEEDS TO CHANGE
        outerWs.deleteVariableById(model.getId());
      }
    }
  }
};

Blockly.Blocks['procedures_callnoreturn'] = {
  /**
   * Block for calling a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW').appendField(this.id, 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Msg['PROCEDURES_HUE']);
    // Tooltip is set in renameProcedure.
    this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argumentVarModels_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.previousDisabledState_ = false;
    this.returnType = null;
  },

  /**
   * Returns the name of the procedure this block calls.
   * @return {string} Procedure name.
   * @this Blockly.Block
   */
  getProcedureCall: function() {
    // The NAME field is guaranteed to exist, null will never be returned.
    return /** @type {string} */ this.getFieldValue('NAME');
  },
  /**
   * Notification that a procedure is renaming.
   * If the name matches this block's procedure, rename it.
   * @param {string} oldName Previous name of procedure.
   * @param {string} newName Renamed procedure.
   * @this Blockly.Block
   */
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
      this.setFieldValue(newName, 'NAME');
      const baseMsg = this.outputConnection
        ? Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP']
        : Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  /**
   * Notification that the procedure's parameters have changed.
   * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
   * @param {!Array.<string>} paramIds IDs of params (consistent for each
   *     parameter through the life of a mutator, regardless of param renaming),
   *     e.g. ['piua', 'f8b_', 'oi.o'].
   * @param {!Array.<string>} types like Number, String, etc
   * @private
   * @this Blockly.Block
   */
  setProcedureParameters_: function(paramNames, paramIds, types) {
    // Data structures:
    // this.arguments = ['x', 'y']
    //     Existing param names.
    // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
    //     Look-up of paramIds to connections plugged into the call block.
    // this.quarkIds_ = ['piua', 'f8b_']
    //     Existing param IDs.
    // Note that quarkConnections_ may include IDs that no longer exist, but
    // which might reappear if a param is reattached in the mutator.
    const defBlock = Blockly.Procedures.getDefinition(
      this.getProcedureCall(),
      this.workspace
    );
    const mutatorOpen =
      defBlock && defBlock.mutator && defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      // Reset the quarks (a mutator is about to open).
      return;
    }

    const oldTypes = this.argumentVarModels_
      ? this.argumentVarModels_.map(function(argModel) {
          return argModel.type;
        })
      : [];

    // Test arguments (arrays of strings) for changes. '\n' is not a valid
    // argument name character, so it is a valid delimiter here.
    if (
      paramNames.join('\n') === this.arguments_.join('\n') &&
      oldTypes.join(',') === types.join(',')
    ) {
      // No change.
      this.quarkIds_ = paramIds;
      return;
    }
    if (paramIds.length !== paramNames.length) {
      throw RangeError('paramNames and paramIds must be the same length.');
    }
    this.setCollapsed(false);
    if (!this.quarkIds_) {
      // Initialize tracking for this block.
      this.quarkConnections_ = {};
      this.quarkIds_ = [];
    }
    // Switch off rendering while the block is rebuilt.
    const savedRendered = this.rendered;
    this.rendered = false;
    // Update the quarkConnections_ with existing connections.
    for (let i = 0; i < this.arguments_.length; i++) {
      const input = this.getInput('ARG' + i);
      if (input) {
        const connection = input.connection.targetConnection;
        this.quarkConnections_[this.quarkIds_[i]] = connection;
        if (
          mutatorOpen &&
          connection &&
          paramIds.indexOf(this.quarkIds_[i]) === -1
        ) {
          // This connection should no longer be attached to this block.
          connection.disconnect();
          connection.getSourceBlock().bumpNeighbours_();
        }
      }
    }
    // Rebuild the block's arguments.
    this.arguments_ = [].concat(paramNames);
    // And rebuild the argument model list.
    this.argumentVarModels_ = [];
    for (let i = 0; i < this.arguments_.length; i++) {
      const variable = Blockly.Variables.getOrCreateVariablePackage(
        this.workspace,
        null,
        this.arguments_[i],
        types[i]
      );
      this.argumentVarModels_.push(variable);
    }

    this.updateShape_();
    this.quarkIds_ = paramIds;
    // Reconnect any child blocks.
    if (this.quarkIds_) {
      for (let i = 0; i < this.arguments_.length; i++) {
        const quarkId = this.quarkIds_[i];
        if (quarkId in this.quarkConnections_) {
          const connection = this.quarkConnections_[quarkId];
          try {
            if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
              // Block no longer exists or has been attached elsewhere.
              delete this.quarkConnections_[quarkId];
            }
          } catch (e) {
            connection.getSourceBlock().bumpNeighbours_();

            console.error('DELETED DETACHED ' + e.message);
            delete this.quarkConnections_[quarkId];
          }
        }
      }
    }
    // Restore rendering and show the changes.
    this.rendered = savedRendered;
    if (this.rendered) {
      this.render();
    }
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    let i = 0;
    for (i = 0; i < this.arguments_.length; i++) {
      let field = this.getField('ARGNAME' + i);
      const labelString =
        this.argumentVarModels_[i].name +
        ' (' +
        this.argumentVarModels_[i].type +
        ') ';
      if (field) {
        // Ensure argument name is up to date.
        // The argument name field is deterministic based on the mutation,
        // no need to fire a change event.
        Blockly.Events.disable();
        try {
          field.setValue(labelString);
          this.getInput('ARG' + i).setCheck([this.argumentVarModels_[i].type]);
        } finally {
          Blockly.Events.enable();
        }
      } else {
        // Add new input.
        field = new Blockly.FieldLabel(labelString);
        const input = this.appendValueInput('ARG' + i)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField(field, 'ARGNAME' + i)
          .setCheck([this.argumentVarModels_[i].type]); //  TESTING CHECK TYPES GOES HERE
        input.init();
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    // Add 'with:' if there are parameters, remove otherwise.
    const topRow = this.getInput('TOPROW');
    if (topRow) {
      if (this.arguments_.length) {
        if (!this.getField('WITH')) {
          topRow.appendField(
            Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'],
            'WITH'
          );
          topRow.init();
        }
      } else {
        if (this.getField('WITH')) {
          topRow.removeField('WITH');
        }
      }
    }
  },
  /**
   * Create XML to represent the (non-editable) name and arguments.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    const container = document.createElement('mutation');
    container.setAttribute('name', this.getProcedureCall());
    for (let i = 0; i < this.arguments_.length; i++) {
      const parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      parameter.setAttribute('type', this.argumentVarModels_[i].type);
      // TESTING ARGUMENTS NEED TO SET IN XML
      container.appendChild(parameter);
    }

    if (this.returnType) {
      container.setAttribute('return_type', this.returnType);
    }

    return container;
  },
  /**
   * Parse XML to restore the (non-editable) name and parameters.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    const name = xmlElement.getAttribute('name');
    this.renameProcedure(this.getProcedureCall(), name);
    const args = [];
    const paramIds = [];
    const types = [];
    for (let i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
      if (childNode.nodeName.toLowerCase() === 'arg') {
        args.push(childNode.getAttribute('name'));
        types.push(childNode.getAttribute('type'));
        paramIds.push(childNode.getAttribute('paramId'));
      }
    }

    const returnType = xmlElement.getAttribute('return_type');

    // Sets the output of the block
    if (returnType) {
      this.setOutput(true, returnType);
      this.returnType = returnType;
    }
    this.setProcedureParameters_(args, paramIds, types);
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<!Blockly.VariableModel>} List of variable models.
   * @this Blockly.Block
   */
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  /**
   * Procedure calls cannot exist without the corresponding procedure
   * definition.  Enforce this link whenever an event is fired.
   * @param {!Blockly.Events.Abstract} event Change event.
   * @this Blockly.Block
   */
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      // Block is deleted or is in a flyout.
      return;
    }
    if (!event.recordUndo) {
      // Events not generated by user. Skip handling.
      return;
    }

    if (
      event.type === Blockly.Events.BLOCK_CREATE &&
      event.ids.indexOf(this.id) !== -1
    ) {
      const typesAndNames = this.argumentVarModels_
        ? this.argumentVarModels_.map(function(arg) {
            return { name: arg.name, type: arg.type };
          })
        : [];

      // Look for the case where a procedure call was created (usually through
      // paste) and there is no matching definition.  In this case, create
      // an empty definition block with the correct signature.
      const name = this.getProcedureCall();
      let def = Blockly.Procedures.getDefinition(name, this.workspace);

      const defTypesAndNames = def.argumentVarModels_
        ? def.argumentVarModels_.map(function(arg) {
            return { name: arg.name, type: arg.type };
          })
        : [];

      if (
        def &&
        (def.type !== this.defType_ ||
          JSON.stringify(typesAndNames) !== JSON.stringify(defTypesAndNames))
      ) {
        // The signatures don't match.
        def = null;
      }
      if (!def) {
        Blockly.Events.setGroup(event.group);
        /**
         * Create matching definition block.
         * <xml>
         *   <block type="procedures_defreturn" x="10" y="20">
         *     <mutation name="test">
         *       <arg name="x"></arg>
         *     </mutation>
         *     <field name="NAME">test</field>
         *   </block>
         * </xml>
         */
        const xml = document.createElement('xml');
        const block = document.createElement('block');
        block.setAttribute('type', this.defType_);
        const xy = this.getRelativeToSurfaceXY();
        const x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
        const y = xy.y + Blockly.SNAP_RADIUS * 2;
        block.setAttribute('x', x);
        block.setAttribute('y', y);
        const mutation = this.mutationToDom();
        block.appendChild(mutation);
        const field = document.createElement('field');
        field.setAttribute('name', 'NAME');
        field.appendChild(document.createTextNode(this.getProcedureCall()));
        block.appendChild(field);
        xml.appendChild(block);
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        Blockly.Events.setGroup(false);
      }
    } else if (event.type === Blockly.Events.BLOCK_DELETE) {
      // Look for the case where a procedure definition has been deleted,
      // leaving this block (a procedure call) orphaned.  In this case, delete
      // the orphan.
      const name = this.getProcedureCall();
      const def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (!def) {
        Blockly.Events.setGroup(event.group);
        this.dispose(true, false);
        Blockly.Events.setGroup(false);
      }
    } else if (
      event.type === Blockly.Events.CHANGE &&
      event.element === 'disabled'
    ) {
      const name = this.getProcedureCall();
      const def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def && def.id === event.blockId) {
        // in most cases the old group should be ''
        const oldGroup = Blockly.Events.getGroup();
        if (oldGroup) {
          // This should only be possible programatically and may indicate a problem
          // with event grouping. If you see this message please investigate. If the
          // use ends up being valid we may need to reorder events in the undo stack.
          console.log(
            'Saw an existing group while responding to a definition change'
          );
        }
        Blockly.Events.setGroup(event.group);
        if (event.newValue) {
          this.previousDisabledState_ = this.disabled;
          this.setDisabled(true);
        } else {
          this.setDisabled(this.previousDisabledState_);
        }
        Blockly.Events.setGroup(oldGroup);
      }
    }
  },
  /**
   * Add menu option to find the definition block for this call.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    const option: any = { enabled: true };
    option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
    const name = this.getProcedureCall();
    const workspace = this.workspace;
    option.callback = function() {
      const def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },
  defType_: 'procedures_defnoreturn'
};

Blockly.Blocks['procedures_callreturn'] = {
  /**
   * Block for calling a procedure with a return value.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput('TOPROW').appendField('', 'NAME');
    this.setOutput(true, 'Number'); // Start off as number
    this.setColour(Blockly.Msg['PROCEDURES_HUE']);
    // Tooltip is set in domToMutation.
    this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']);
    this.arguments_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.previousDisabledState_ = false;
  },

  getProcedureCall: Blockly.Blocks['procedures_callnoreturn'].getProcedureCall,
  renameProcedure: Blockly.Blocks['procedures_callnoreturn'].renameProcedure,
  setProcedureParameters_:
    Blockly.Blocks['procedures_callnoreturn'].setProcedureParameters_,
  updateShape_: Blockly.Blocks['procedures_callnoreturn'].updateShape_,
  mutationToDom: Blockly.Blocks['procedures_callnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_callnoreturn'].domToMutation,
  getVarModels: Blockly.Blocks['procedures_callnoreturn'].getVarModels,
  onchange: Blockly.Blocks['procedures_callnoreturn'].onchange,
  customContextMenu:
    Blockly.Blocks['procedures_callnoreturn'].customContextMenu,
  defType_: 'procedures_defreturn'
};
