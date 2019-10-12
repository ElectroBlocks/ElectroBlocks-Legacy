import { ShowArduinoCommunicator } from './../../core/services/virtual-circuit/communicators/show-arduino.comm';
import { VirtualCircuit } from './../../core/services/virtual-circuit/svg/virtual-circuit';
import { FramePlayer } from './../../core/services/player/frame/frame_player';
import { ExecuteVirtualCircuitFrame } from '../../core/services/player/frame/frame_execute';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { virtualCircuitFactory } from '../../core/services/virtual-circuit/factory/virtual-circuit.factory';
import { BlocklyService } from '../../core/services/blockly.service';
import { AbstractSubComponent } from '../../abstract-sub.component';
import { startWith, share, tap } from 'rxjs/operators';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent extends AbstractSubComponent implements OnInit {
  private virtualCircuit: VirtualCircuit;

  isShowArduinoChecked$ = this.showArduinoComm.showArduino$.pipe(
    startWith(this.showArduinoComm.getShowArduino()),
    share(),
    tap(show => {
      if (!this.virtualCircuitElement) {
        return;
      }

      if (show) {
        this.moveCenter();
        return;
      }

      this.virtualCircuit.hideArduino();
    })
  );

  @ViewChild('virtualCircuit', { static: false })
  virtualCircuitElement: ElementRef<HTMLDivElement>;

  constructor(
    private player: FramePlayer,
    private showArduinoComm: ShowArduinoCommunicator,
    private blocklyService: BlocklyService
  ) {
    super();
  }

  ngOnInit() {}

  changeShowArduino($event: MatSlideToggleChange) {
    this.showArduinoComm.setShowArduino($event.checked);
  }

  moveRight() {
    this.virtualCircuit.moveRight();
  }

  moveLeft() {
    this.virtualCircuit.moveLeft();
  }

  moveUp() {
    this.virtualCircuit.moveUp();
  }

  moveDown() {
    this.virtualCircuit.moveDown();
  }

  zoomIn() {
    this.virtualCircuit.zoomIn();
  }

  zoomOut() {
    this.virtualCircuit.zoomOut();
  }

  moveCenterEvent() {
    this.showArduinoComm.setShowArduino(true);
  }

  async moveCenter() {
    if (this.virtualCircuit) {
      this.virtualCircuit.remove();
    }
    await this.setVirtualCircuit();
  }

  async ngAfterViewInit() {
    await this.moveCenterEvent();
  }

  async setVirtualCircuit() {
    const executor = this.player.frameExecutor;
    if (executor instanceof ExecuteVirtualCircuitFrame) {
      this.virtualCircuit = await virtualCircuitFactory(this.showArduinoComm);
      executor.setVirtualCircuit(this.virtualCircuit);
    }

    this.blocklyService.resizeWorkspace();
    await this.player.resetState();
  }
}
