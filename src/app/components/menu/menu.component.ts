import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';
import { IdentityService } from '../../services/identity/identity.service';
import { BlocklyService } from '../../services/blockly/blockly.service';
import { ShowArduinoCommunicator } from '../../services/communicators/virtual-circuit/show-arduino.comm';
import { Router } from '@angular/router';
import 'file-saver';
import {
  DeviceCommunicator,
  ArduinoOnlineState,
  DeviceMessageType
} from '../../services/communicators/device/device.communicator';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  arduinoState = ArduinoOnlineState.DISCONNECTED;

  constructor(
    public readonly identityService: IdentityService,
    private blocklyService: BlocklyService,
    private showArduinoCommunicator: ShowArduinoCommunicator,
    private router: Router,
    private deviceCommunicator: DeviceCommunicator,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.deviceCommunicator.arduinoState$.subscribe(arduinoState => {
      if (arduinoState === ArduinoOnlineState.UPLOAD_CODE_COMPLETE.toString()) {
        alert('Your code was succussfully uploaded. :)');
        return;
      }

      if (arduinoState === ArduinoOnlineState.UPLOAD_CODE_ERROR.toString()) {
        alert(
          'There was an error uploading your code, please try again or file a bug. :('
        );
      }

      if (arduinoState.toString() !== this.arduinoState.toString()) {
        this.arduinoState = arduinoState;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

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

  uploadCode() {
    const code = this.blocklyService.getArduinoCode();
    this.deviceCommunicator.sendMessage(DeviceMessageType.UPLOAD_CODE, code);
    this.router.navigate(['/arduino']);
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
