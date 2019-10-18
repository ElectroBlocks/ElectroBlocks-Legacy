import { defineBlocksWithJsonArray } from 'blockly';

defineBlocksWithJsonArray([
  // BEGIN JSON EXTRACT
  {
    type: 'variables_get_number',
    message0: '= number stored variable %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Number'],
        defaultType: 'Number'
      }
    ],
    output: 'Number',
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_set_number',
    message0: 'Number variable named %1 = %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Number'],
        defaultType: 'Number',
        createNewVariable: false
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_get_colour',
    message0: '= color stored variable %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Colour'],
        defaultType: 'Colour'
      }
    ],
    output: 'Colour',
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_set_colour',
    message0: 'Color variable named %1 = %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Colour'],
        defaultType: 'Colour'
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Colour'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_get_string',
    message0: '= text stored variable %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['String'],
        defaultType: 'String'
      }
    ],
    output: 'String',
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_set_string',
    message0: 'Text variable named %1 = %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['String'],
        defaultType: 'String'
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_get_boolean',
    message0: '= boolean stored variable %1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Boolean'],
        defaultType: 'Boolean'
      }
    ],
    output: 'Boolean',
    colour: '330',
    tooltip: '',
    helpUrl: ''
  },
  {
    type: 'variables_set_boolean',
    message0: 'Boolean variable named %1 = %2',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: null,
        variableTypes: ['Boolean'],
        defaultType: 'Boolean'
      },
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'Boolean'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '330',
    tooltip: '',
    helpUrl: ''
  }
]); // END JSON EXTRACT (Do not delete this comment.)
