import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

export abstract class DeviceCommunicator {
  protected messageSubject = new Subject<ArduinoMessage>();

  protected isArduinoPluggedInSubject = new Subject<boolean>();

  message$: Observable<ArduinoMessage> = this.messageSubject.asObservable();

  isArduinoPluggedIn$: Observable<
    boolean
  > = this.isArduinoPluggedInSubject.asObservable().pipe(startWith(false));

  abstract sendMessage(type: DeviceMessageType, message: string): void;
}

export enum DeviceMessageType {
  SEND_MESSAGE = 'SEND_MESSAGE',
  UPLOAD_CODE = 'UPLOAD_CODE'
}

export interface ArduinoMessage {
  type: 'Arduino' | 'Computer';
  message: string;
  time: string;
}
