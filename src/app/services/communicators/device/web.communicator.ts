import { DeviceCommunicator, DeviceMessageType } from './device.communicator';

export class WebCommunicator extends DeviceCommunicator {
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
