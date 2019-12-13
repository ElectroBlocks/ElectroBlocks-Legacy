import { Observable } from 'rxjs';

export interface USBCommunicator {
  messageString$: Observable<ArduinoMessage>;

  isArduinoPluggedIn$: Observable<boolean>;

  sendArduinoMessage(message: string);

  uploadCode(code: string);
}

export interface ArduinoMessage {
  type: 'Arduino' | 'Computer';
  message: string;
  time: string;
}
