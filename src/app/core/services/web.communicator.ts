import { DeviceCommunicator, DeviceMessageType } from './device.communicator';

export class WebCommunicator extends DeviceCommunicator {
  sendMessage(type: DeviceMessageType, message: string): void {
    console.log(`TYPE ${type} MESSAGE ${message}`);
    console.log(
      'Not sending message because at this time the web can not flash an Arduino.'
    );
    this.messageSubject.next({
      type: 'Computer',
      message,
      time: new Date().toLocaleTimeString()
    });
  }
}
