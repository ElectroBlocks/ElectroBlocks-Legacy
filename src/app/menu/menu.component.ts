import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { BlocklyService } from '../core/services/blockly.service';
import { ShowArduinoCommunicator } from '../core/services/virtual-circuit/communicators/show-arduino.comm';
import { Router } from '@angular/router';
import 'file-saver';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor(
    private electronService: ElectronService,
    private blocklyService: BlocklyService,
    private showArduinoCommunicator: ShowArduinoCommunicator,
    private router: Router
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

  navigateToSettings(settingSection: string) {
    switch (settingSection) {
      case 'advanced':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'advanced' } }
        ]);
        break;
      case 'help':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'help' } }
        ]);
        break;
      case 'toolbox':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'toolbox' } }
        ]);
        break;
      case 'bug':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'bug' } }
        ]);
        break;
      case 'about':
        this.router.navigate([
          'settings',
          { outlets: { settingContainer: 'about' } }
        ]);
        break;
    }
  }
}
