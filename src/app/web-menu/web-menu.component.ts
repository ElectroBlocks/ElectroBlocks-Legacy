import { ShowArduinoCommunicator } from './../core/services/virtual-circuit/communicators/show-arduino.comm';
import { BlocklyService } from './../core/services/blockly.service';
import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-web-menu',
  templateUrl: './web-menu.component.html',
  styleUrls: ['./web-menu.component.scss']
})
export class WebMenuComponent implements OnInit {
  constructor(
    private blocklyService: BlocklyService,
    private showArduinoCommunicator: ShowArduinoCommunicator
  ) {}

  ngOnInit() {}

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
    saveAs(blob, `electro_blocks_${new Date().getMilliseconds()}.xml`);
  }

  help() {
    alert('not up yet. :) shoudl show up. :)');
  }
}
