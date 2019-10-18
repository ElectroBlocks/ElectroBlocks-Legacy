import * as Blockly from 'blockly/core';

export const overrideTrashBlocks = workspace => {
  workspace.trashcan.flyout_.workspace_.addChangeListener(function(event) {
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
        let removeDisableStringFromBlock = trashCan.contents_[i].replace(
          / disabled="true"/g,
          ''
        );
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
};
