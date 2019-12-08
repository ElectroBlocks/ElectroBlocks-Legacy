import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { BlocklyService } from '../core/services/blockly.service';
import { ShowArduinoCommunicator } from '../core/services/virtual-circuit/communicators/show-arduino.comm';

@Component({
  selector: 'app-electron-menu',
  templateUrl: './electron-menu.component.html',
  styleUrls: ['./electron-menu.component.scss']
})
export class ElectronMenuComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private blocklyService: BlocklyService,
    private showArduinoCommunicator: ShowArduinoCommunicator
  ) {}

  ngOnInit() {}

  newFile() {
    this.blocklyService.resetWorkspace();
  }

  uploadFile($event) {
    this.showArduinoCommunicator.setShowArduino(true);
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = () => {
      this.blocklyService.loadFile(reader.result.toString());
    };
  }

  downloadFile() {
    const code = this.blocklyService.getXMLCode();
    const blob = new Blob([code], { type: 'text/xml;charset=utf-8' });
    saveAs(blob, `electro_blocks_${Date.now()}.xml`);
  }
}
