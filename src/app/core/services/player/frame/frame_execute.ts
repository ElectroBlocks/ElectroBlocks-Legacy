import { Injectable, InjectionToken } from '@angular/core';
import { VirtualCircuit } from './../../virtual-circuit/svg/virtual-circuit';
import { ArduinoState } from '../arduino/state/arduino.state';

export class ExecuteUSBFrame implements ExecuteFrameInterface {
  constructor() {}

  public executeFrame(
    state: ArduinoState,
    finalState: ArduinoState,
    runSetup: boolean
  ) {
    // TODO HOOK UP STATE TO COMMAND
    return Promise.resolve(true);
  }

  public reset() {}

  public isReady() {
    return true;
  }

  public stopAmination() {}
}

@Injectable({
  providedIn: 'root'
})
export class ExecuteVirtualCircuitFrame implements ExecuteFrameInterface {
  private virtualCircuit: VirtualCircuit;

  constructor() {}

  setVirtualCircuit(virtualCircuit: VirtualCircuit) {
    delete this.virtualCircuit;
    this.virtualCircuit = virtualCircuit;
  }

  async executeFrame(
    state: ArduinoState,
    finalState: ArduinoState,
    runSetup: boolean
  ): Promise<boolean> {
    await this.virtualCircuit.matchFinalState(finalState, runSetup);
    await this.virtualCircuit.matchState(state);
    return true;
  }

  async reset() {
    await this.virtualCircuit.matchFinalState(new ArduinoState([], {}), true);
    await this.virtualCircuit.matchState(new ArduinoState([], {}));
  }

  isReady() {
    return this.virtualCircuit !== undefined;
  }

  public stopAmination() {
    this.virtualCircuit.stopAllAnimations();
  }
}

export class ExecuteDebugFrame implements ExecuteFrameInterface {
  public executeFrame(
    state: ArduinoState,
    finalState: ArduinoState,
    runSetup: boolean
  ) {
    console.log(state, 'USB COMMAND');
    return Promise.resolve(true);
  }

  public reset() {}

  isReady() {
    return true;
  }

  public stopAmination() {}
}

export class ExecuteSilentFrame implements ExecuteFrameInterface {
  public executeFrame(
    state: ArduinoState,
    finalState: ArduinoState,
    runSetup: boolean
  ) {
    return Promise.resolve(true);
  }

  public reset() {}

  isReady() {
    return true;
  }

  public stopAmination() {}
}

export interface ExecuteFrameInterface {
  executeFrame(
    state: ArduinoState,
    finalState: ArduinoState,
    runSetup: boolean
  ): Promise<boolean>;

  reset(): void;

  isReady(): boolean;

  stopAmination(): void;
}

export const ExecuteFrameProvider = new InjectionToken('ExecuteFrameProvider', {
  providedIn: 'root',
  factory: () => new ExecuteVirtualCircuitFrame()
});
