/**
 * Blockly Demos: Code
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
    'ar': 'العربية',
    'be-tarask': 'Taraškievica',
    'br': 'Brezhoneg',
    'ca': 'Català',
    'cs': 'Česky',
    'da': 'Dansk',
    'de': 'Deutsch',
    'el': 'Ελληνικά',
    'en': 'English',
    'es': 'Español',
    'et': 'Eesti',
    'fa': 'فارسی',
    'fr': 'Français',
    'he': 'עברית',
    'hrx': 'Hunsrik',
    'hu': 'Magyar',
    'ia': 'Interlingua',
    'is': 'Íslenska',
    'it': 'Italiano',
    'ja': '日本語',
    'kab': 'Kabyle',
    'ko': '한국어',
    'mk': 'Македонски',
    'ms': 'Bahasa Melayu',
    'nb': 'Norsk Bokmål',
    'nl': 'Nederlands, Vlaams',
    'oc': 'Lenga d\'òc',
    'pl': 'Polski',
    'pms': 'Piemontèis',
    'pt-br': 'Português Brasileiro',
    'ro': 'Română',
    'ru': 'Русский',
    'sc': 'Sardu',
    'sk': 'Slovenčina',
    'sr': 'Српски',
    'sv': 'Svenska',
    'ta': 'தமிழ்',
    'th': 'ภาษาไทย',
    'tlh': 'tlhIngan Hol',
    'tr': 'Türkçe',
    'uk': 'Українська',
    'vi': 'Tiếng Việt',
    'zh-hans': '简体中文',
    'zh-hant': '正體中文'
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function (name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function () {
    var lang = Code.getStringParamFromUrl('lang', '');
    if (Code.LANGUAGE_NAME[lang] === undefined) {
        // Default to English.
        lang = 'en';
    }
    return lang;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function () {
    return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function (defaultXml) {
    try {
        var loadOnce = window.sessionStorage.loadOnceBlocks;
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing sessionStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
        var loadOnce = null;
    }
    if ('BlocklyStorage' in window && window.location.hash.length > 1) {
        // An href with #key trigers an AJAX call to retrieve saved blocks.
        BlocklyStorage.retrieveXml(window.location.hash.substring(1));
    } else if (loadOnce) {
        // Language switching stores the blocks during the reload.
        delete window.sessionStorage.loadOnceBlocks;
        var xml = Blockly.Xml.textToDom(loadOnce);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if (defaultXml) {
        // Load the editor with default starting blocks.
        var xml = Blockly.Xml.textToDom(defaultXml);
        Blockly.Xml.domToWorkspace(xml, Code.workspace);
    } else if ('BlocklyStorage' in window) {
        // Restore saved blocks in a separate thread so that subsequent
        // initialization is not affected from a failed load.
        window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function () {
    // Store the blocks for the duration of the reload.
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (window.sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(Code.workspace);
        var text = Blockly.Xml.domToText(xml);
        window.sessionStorage.loadOnceBlocks = text;
    }

    var languageMenu = document.getElementById('languageMenu');
    var newLang = encodeURIComponent(
        languageMenu.options[languageMenu.selectedIndex].value);
    var search = window.location.search;
    if (search.length <= 1) {
        search = '?lang=' + newLang;
    } else if (search.match(/[?&]lang=[^&]*/)) {
        search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
    } else {
        search = search.replace(/\?/, '?lang=' + newLang + '&');
    }

    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname + search;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function () {
    var script = document.createElement('script');
    script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
    document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function (element) {
    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'javascript', 'arduino'];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function (clickedName) {
    // If the XML tab was open, save and render the content.
    if (document.getElementById('tab_xml').className == 'tabon') {
        var xmlTextarea = document.getElementById('content_xml');
        var xmlText = xmlTextarea.value;
        var xmlDom = null;
        try {
            xmlDom = Blockly.Xml.textToDom(xmlText);
        } catch (e) {
            var q =
                window.confirm(MSG['badXml'].replace('%1', e));
            if (!q) {
                // Leave the user on the XML tab.
                return;
            }
        }
        if (xmlDom) {
            Code.workspace.clear();
            Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
        }
    }

    if (document.getElementById('tab_blocks').className == 'tabon') {
        Code.workspace.setVisible(false);
    }
    // Deselect all tabs and hide all panes.
    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        document.getElementById('tab_' + name).className = 'taboff';
        document.getElementById('content_' + name).style.visibility = 'hidden';
    }

    // Select the active tab.
    Code.selected = clickedName;
    document.getElementById('tab_' + clickedName).className = 'tabon';
    // Show the selected pane.
    document.getElementById('content_' + clickedName).style.visibility =
        'visible';
    Code.renderContent();
    if (clickedName == 'blocks') {
        Code.workspace.setVisible(true);
    }
    Blockly.svgResize(Code.workspace);
};

Code.escapeHTML = function (s) {
    return s.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function () {
    var content = document.getElementById('content_' + Code.selected);
    // Initialize the pane.
    if (content.id == 'content_xml') {
        var xmlTextarea = document.getElementById('content_xml');
        var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        xmlTextarea.value = xmlText;
        xmlTextarea.focus();
    } else if (content.id == 'content_javascript') {
        Code.attemptCodeGeneration(Blockly.JavaScript, 'js');
    } else if (content.id == 'content_arduino') {
        Code.attemptCodeGeneration(Blockly.Arduino, 'cpp');
    } else if (content.id == 'content_php') {
        Code.attemptCodeGeneration(Blockly.PHP, 'php');
    } else if (content.id == 'content_dart') {
        Code.attemptCodeGeneration(Blockly.Dart, 'dart');
    } else if (content.id == 'content_lua') {
        Code.attemptCodeGeneration(Blockly.Lua, 'lua');
    }
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 * @param prettyPrintType {string} The file type key for the pretty printer.
 */
Code.attemptCodeGeneration = function (generator, prettyPrintType) {
    var content = document.getElementById('content_' + Code.selected);
    content.textContent = '';
    if (Code.checkAllGeneratorFunctionsDefined(generator)) {
        var code = generator.workspaceToCode(Code.workspace);
        code = Code.escapeHTML(code);
        console.log(code, 'code');
        content.textContent = code;
        if (typeof PR.prettyPrintOne == 'function') {
            code = content.textContent;
            code = PR.prettyPrintOne(code, prettyPrintType);
            content.innerHTML = code;
        }
    }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function (generator) {
    var blocks = Code.workspace.getAllBlocks(false);
    var missingBlockGenerators = [];
    for (var i = 0; i < blocks.length; i++) {
        var blockType = blocks[i].type;
        if (!generator[blockType]) {
            if (missingBlockGenerators.indexOf(blockType) === -1) {
                missingBlockGenerators.push(blockType);
            }
        }
    }

    var valid = missingBlockGenerators.length == 0;
    if (!valid) {
        var msg = 'The generator code for the following blocks not specified for '
            + generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.alert(msg);  // Assuming synchronous. No callback.
    }
    return valid;
};

/**
 * A list of stand alone blocks
 * @type {[*]}
 */
Code.standAloneBlocks = [
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

Code.setupBlocks = [
    'lcd_setup',
    'neo_pixel_setup',
    'soil_sensor_setup',
    'ir_remote_setup',
    'temp_setup',
    'bluetooth_setup'
];

Code.blocksThatRequireSetup = {
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
}


/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function () {
    Code.initLanguage();

    var rtl = Code.isRtl();
    var container = document.getElementById('content_area');
    var onresize = function (e) {
        var bBox = Code.getBBox_(container);
        for (var i = 0; i < Code.TABS_.length; i++) {
            var el = document.getElementById('content_' + Code.TABS_[i]);
            el.style.top = bBox.y + 'px';
            el.style.left = bBox.x + 'px';
            // Height and width need to be set, read back, then set again to
            // compensate for scrollbars.
            el.style.height = bBox.height + 'px';
            el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
            el.style.width = bBox.width + 'px';
            el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
        }
        // Make the 'Blocks' tab line up with the toolbox.
        if (Code.workspace && Code.workspace.toolbox_.width) {
            document.getElementById('tab_blocks').style.minWidth =
                (Code.workspace.toolbox_.width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
        }
    };
    window.addEventListener('resize', onresize, false);

    // The toolbox XML specifies each category name using Blockly's messaging
    // format (eg. `<category name="%{BKY_CATLOGIC}">`).
    // These message keys need to be defined in `Blockly.Msg` in order to
    // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
    // been defined for each language to import each category name message
    // into `Blockly.Msg`.
    // TODO: Clean up the message files so this is done explicitly instead of
    // through this for-loop.
    for (var messageKey in MSG) {
        if (messageKey.indexOf('cat') == 0) {
            Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
        }
    }

    // Construct the toolbox XML, replacing translated variable names.
    var toolboxText = document.getElementById('toolbox').outerHTML;
    toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
        function (m, p1, p2) {
            return p1 + MSG[p2];
        });
    var toolboxXml = Blockly.Xml.textToDom(toolboxText);

    Code.workspace = Blockly.inject('content_blocks',
        {
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            media: '../../media/',
            rtl: rtl,
            toolbox: toolboxXml,
            zoom: {
                controls: true,
                wheel: true
            }
        });

    // Clean up variable when a
    Code.workspace.addChangeListener(function (event) {

        var blocks = Code.workspace.getAllBlocks();

        for (var k = 0; k < blocks.length; k += 1) {
            for (var property in Code.blocksThatRequireSetup) {
                if (!Code.blocksThatRequireSetup.hasOwnProperty(property)) continue;
                blocks.forEach(function (block) {
                    if (block.type != property) {
                        return;
                    }
                    var setupBlockRequired = Code.blocksThatRequireSetup[property];

                    var disableBlock = blocks.filter(function (block) {
                            return block.type == setupBlockRequired;
                        }).length == 0;

                    block.setDisabled(disableBlock);
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
                    Code.standAloneBlocks.indexOf(block.getRootBlock().type) == -1;

                if (!disableBlock && Code.blocksThatRequireSetup.hasOwnProperty(block.type)) {
                    var setupBlockRequired = Code.blocksThatRequireSetup[block.type];

                    disableBlock = blocks.filter(function (block) {
                            return block.type == setupBlockRequired;
                        }).length == 0;

                }

                block.setDisabled(disableBlock);
                for (var i = 0; i < block.getChildren().length; i += 1) {
                    block.getChildren()[i].setDisabled(disableBlock);
                }
                if (Code.setupBlocks.indexOf(block.type) > -1) {
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

            var variables = Code.workspace.getAllVariables();

            for (var key in variables) {
                if (variables.hasOwnProperty(key) && Code.workspace.getVariableUsesById(variables[key].getId()).length == 0) {
                    Code.workspace.deleteVariableById(variables[key].getId());
                }
            }
        }
    });

    Code.workspace.registerToolboxCategoryCallback('LIST', function (workspace) {
        var xmlList = [];
        var btnCreateNumberList = document.createElement('button');
        btnCreateNumberList.setAttribute('text', 'Create a list of number');
        btnCreateNumberList.setAttribute('callbackKey', 'CREATE_NUMBER_LIST');
        workspace.registerButtonCallback('CREATE_NUMBER_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Code.workspace, function () {
                var createListNumberBlock = Code.workspace.newBlock('create_list_number_block');
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
            Blockly.Variables.createVariableButtonHandler(Code.workspace, function () {
                var createListStringBlock = Code.workspace.newBlock('create_list_string_block');
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
        Code.workspace.registerButtonCallback('CREATE_BOOLEAN_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Code.workspace, function () {
                var createBooleanListBlock = Code.workspace.newBlock('create_list_boolean_block');
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
        Code.workspace.registerButtonCallback('CREATE_COLOUR_LIST', function () {
            Blockly.Variables.createVariableButtonHandler(Code.workspace, function () {
                var createColourListBlock = Code.workspace.newBlock('create_list_colour_block');
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

    // Add to reserved word list: Local variables in execution environment (runJS)
    // and the infinite loop detection function.
    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

    Code.loadBlocks('');

    if ('BlocklyStorage' in window) {
        // Hook a save function onto unload.
        BlocklyStorage.backupOnUnload(Code.workspace);
    }

    Code.tabClick(Code.selected);

    Code.bindClick('trashButton',
        function () {
            Code.discard();
            Code.renderContent();
        });
    Code.bindClick('runButton', Code.runJS);
    // Disable the link button if page isn't backed by App Engine storage.
    var linkButton = document.getElementById('linkButton');
    if ('BlocklyStorage' in window) {
        BlocklyStorage['HTTPREQUEST_ERROR'] = MSG['httpRequestError'];
        BlocklyStorage['LINK_ALERT'] = MSG['linkAlert'];
        BlocklyStorage['HASH_ERROR'] = MSG['hashError'];
        BlocklyStorage['XML_ERROR'] = MSG['xmlError'];
        Code.bindClick(linkButton,
            function () {
                BlocklyStorage.link(Code.workspace);
            });
    } else if (linkButton) {
        linkButton.className = 'disabled';
    }

    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        Code.bindClick('tab_' + name,
            function (name_) {
                return function () {
                    Code.tabClick(name_);
                };
            }(name));
    }
    onresize();
    Blockly.svgResize(Code.workspace);

    var xml = '<xml><block type="arduino_start" deletable="false" movable="true"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), Code.workspace);
    Code.workspace.centerOnBlock(Code.workspace.getAllBlocks()[0].id);

    // Lazy-load the syntax-highlighting.
    window.setTimeout(Code.importPrettify, 1);
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function () {
    // Set the HTML's language and direction.
    var rtl = Code.isRtl();
    document.dir = rtl ? 'rtl' : 'ltr';
    document.head.parentElement.setAttribute('lang', Code.LANG);

    // Sort languages alphabetically.
    var languages = [];
    for (var lang in Code.LANGUAGE_NAME) {
        languages.push([Code.LANGUAGE_NAME[lang], lang]);
    }
    var comp = function (a, b) {
        // Sort based on first argument ('English', 'Русский', '简体字', etc).
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
    };
    languages.sort(comp);
    // Populate the language selection menu.
    var languageMenu = document.getElementById('languageMenu');
    languageMenu.options.length = 0;
    for (var i = 0; i < languages.length; i++) {
        var tuple = languages[i];
        var lang = tuple[tuple.length - 1];
        var option = new Option(tuple[0], lang);
        if (lang == Code.LANG) {
            option.selected = true;
        }
        languageMenu.options.add(option);
    }
    languageMenu.addEventListener('change', Code.changeLanguage, true);

    // Inject language strings.
    document.title += ' ' + MSG['title'];
    document.getElementById('title').textContent = MSG['title'];
    document.getElementById('tab_blocks').textContent = MSG['blocks'];

    document.getElementById('linkButton').title = MSG['linkTooltip'];
    document.getElementById('runButton').title = MSG['runTooltip'];
    document.getElementById('trashButton').title = MSG['trashTooltip'];
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function () {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function () {
        if (timeouts++ > 1000000) {
            throw MSG['timeout'];
        }
    };
    var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(MSG['badCode'].replace('%1', e));
    }
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function () {
    var count = Code.workspace.getAllBlocks(false).length;
    if (count < 2 ||
        window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
        Code.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};

// Load the Code demo's language strings.
document.write('<script src="msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
document.write('<script src="../../msg/js/' + Code.LANG + '.js"></script>\n');

window.addEventListener('load', Code.init);
