import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { startWith, share } from 'rxjs/operators';

export abstract class DeviceCommunicator {
  protected messageSubject = new Subject<string>();

  protected arduinoOnlineState = new BehaviorSubject<ArduinoOnlineState>(
    ArduinoOnlineState.DISCONNECTED
  );

  message$: Observable<string> = this.messageSubject
    .asObservable()
    .pipe(share());

  arduinoState$ = this.arduinoOnlineState
    .asObservable()
    .pipe(startWith(ArduinoOnlineState.DISCONNECTED));

  abstract sendMessage(type: DeviceMessageType, message: string): void;
}

export enum DeviceMessageType {
  SEND_MESSAGE = 'SEND_MESSAGE',
  UPLOAD_CODE = 'UPLOAD_CODE',
  DEBUG_MESSAGE = 'DEBUG_MESSAGE'
}

export enum ArduinoOnlineState {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTED = 'CONNECTED',
  UPLOADING_CODE = 'UPLOADING_CODE',
  UPLOAD_CODE_COMPLETE = 'UPLOAD_CODE_COMPLETE',
  UPLOAD_CODE_ERROR = 'UPLOAD_CODE_ERROR'
}

export interface ArduinoMessage {
  type: 'Arduino' | 'Computer';
  message: string;
  time: string;
}
