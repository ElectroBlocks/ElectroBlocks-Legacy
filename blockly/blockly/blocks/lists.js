/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview List blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.lists');  // Deprecated
goog.provide('Blockly.Constants.Lists');  // deprecated, 2018 April 5

goog.require('Blockly.Blocks');
goog.require('Blockly');

/**
 * Unused constant for the common HSV hue for all blocks in this category.
 * @deprecated Use Blockly.Msg['LISTS_HUE']. (2018 April 5)
 */
Blockly.Constants.Lists.HUE = 260;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT

    // NUMBER LIST
    {
        "type": "set_number_list_block",
        "message0": "Store a number  %1 in list %2 at position %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": null,
                "variableTypes": ["List Number"],
                "defaultType": "List Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "get_number_from_list",
        "message0": "Get a number from list at  %1 at position %2",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": null,
                "variableTypes": ["List Number"],
                "defaultType": "List Number"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": false,
        "output": "Number",
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    // STRING LIST
    {
        "type": "set_string_list_block",
        "message0": "Store a text block %1 in list %2 at position %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "String",
                "align": "RIGHT"
            },
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": null,
                "variableTypes": ["List String"],
                "defaultType": "List String"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "get_string_from_list",
        "message0": "Get a text block from list at  %1 at position %2",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": null,
                "variableTypes": ["List String"],
                "defaultType": "List String"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": false,
        "output": "String",
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },

    // Boolean List
    {
        "type": "set_boolean_list_block",
        "message0": "Store a boolean (true/false) %1 in list %2 at position %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Boolean",
                "align": "RIGHT"
            },
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": null,
                "variableTypes": ["List Boolean"],
                "defaultType": "List Boolean"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "get_boolean_from_list",
        "message0": "Get a boolean (true/false) from list at  %1 at position %2",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": null,
                "variableTypes": ["List Boolean"],
                "defaultType": "List Boolean"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": false,
        "output": "Boolean",
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },

    // Colour List
    {
        "type": "set_colour_list_block",
        "message0": "Store a color %1 in list %2 at position %3 %4",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "Colour",
                "align": "RIGHT"
            },
            {
                "type": "field_variable",
                "name": "NAME",
                "variable": null,
                "variableTypes": ["List Colour"],
                "defaultType": "List Colour"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "get_colour_from_list",
        "message0": "Get a color from list at  %1 at position %2",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": null,
                "variableTypes": ["List Colour"],
                "defaultType": "List Colour"
            },
            {
                "type": "input_value",
                "name": "POSITION",
                "check": "Number"
            }
        ],
        "inputsInline": false,
        "output": "Colour",
        "colour": "%{BKY_LISTS_HUE}",
        "tooltip": "",
        "helpUrl": ""
    },

]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['create_list_number_block'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("Create list of numbers named")
            .appendField(new Blockly.FieldVariable(
                null, null, ['List Number'], 'List Number', true, false), "VAR")
            .appendField("that stores ")
            .appendField(new Blockly.FieldNumber(0, 2, 2000), "SIZE")
            .appendField("numbers.");
        this.setColour("%{BKY_LISTS_HUE}");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_list_string_block'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("Create list of text named")
            .appendField(new Blockly.FieldVariable(
                null, null, ['List String'], 'List String', true), "VAR")
            .appendField("that stores ")
            .appendField(new Blockly.FieldNumber(0, 2, 2000), "SIZE")
            .appendField("text blocks.");
        this.setColour("%{BKY_LISTS_HUE}");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_list_colour_block'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("Create list of color named")
            .appendField(new Blockly.FieldVariable(
                null, null, ['List Colour'], 'List Colour', true), "VAR")
            .appendField("that stores ")
            .appendField(new Blockly.FieldNumber(0, 2, 2000), "SIZE")
            .appendField("colour blocks.");
        this.setColour("%{BKY_LISTS_HUE}");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['create_list_boolean_block'] = {
    init: function () {

        this.appendDummyInput()
            .appendField("Create list of boolean named")
            .appendField(new Blockly.FieldVariable(
                null, null, ['List Boolean'], 'List Boolean', true), "VAR")
            .appendField("that stores ")
            .appendField(new Blockly.FieldNumber(0, 2, 2000), "SIZE")
            .appendField("booleans.");
        this.setColour("%{BKY_LISTS_HUE}");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

