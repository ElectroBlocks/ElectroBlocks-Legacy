export interface Variable {
    name: string;
    value: any;
    type: VARIABLE_TYPE|string
}

export enum VARIABLE_TYPE {
    NUMBER = 'Number',
    STRING = 'String',
    BOOLEAN = 'Boolean',
    NUMBER_LIST = 'Number List',
    BOOLEAN_LIST = 'Boolean List',
    STRING_LIST = 'String List'
};