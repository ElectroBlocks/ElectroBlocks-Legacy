import { DeviceCommunicator, DeviceMessageType } from './device.communicator';
import { ArduinoOnlineState } from '../../../../../arduinoNode/serial_port';
import { BehaviorSubject, Subject } from 'rxjs';
import { share, startWith } from 'rxjs/operators';

export class WebCommunicator extends DeviceCommunicator {
  protected messageSubject = new Subject<string>();

  protected arduinoOnlineState = new BehaviorSubject<ArduinoOnlineState>(
    ArduinoOnlineState.DISCONNECTED
  );

  public readonly message$ = this.messageSubject.asObservable().pipe(share());

  public readonly arduinoState$ = this.arduinoOnlineState
    .asObservable()
    .pipe(startWith(ArduinoOnlineState.DISCONNECTED));

  sendMessage(type: DeviceMessageType, message: string): void {
    console.log(`TYPE ${type} MESSAGE ${message}`);
    console.log(
      'Not sending message because at this time the web can not flash an Arduino.'
    );
    if (type === DeviceMessageType.UPLOAD_CODE) {
      return;
    }
    this.messageSubject.next(message);
  }
}
