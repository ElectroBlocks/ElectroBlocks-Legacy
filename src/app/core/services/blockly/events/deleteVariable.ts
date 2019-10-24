import { Workspace } from 'blockly';
import * as Blockly from 'blockly';

export const deleteVariables = (workspace: Workspace, event: {element: string, newValue: string, type: string } ) => {
    if ((event.element === 'mutatorOpen' && !event.newValue) ||
        event.type === Blockly.Events.BLOCK_DELETE) {

        const variables = workspace.getAllVariables();

        variables
            .filter(variable => {
               return workspace.getVariableUsesById(variable.getId()).length === 0;
            })
            .forEach(variable => {
                workspace.deleteVariableById(variable.getId());
            });
    }
};
