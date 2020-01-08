import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  ArduinoMessage,
  DeviceMessageType
} from '../../../services/communicators/device/device.communicator';
import { IdentityService } from '../../../services/identity/identity.service';
import { AbstractSubscriptionComponent } from '../../abstract-subscription.component';
import { WebCommunicator } from '../../../services/communicators/device/web.communicator';

@Component({
  selector: 'app-arduino-message',
  templateUrl: './arduino-message.component.html',
  styleUrls: ['./arduino-message.component.scss']
})
export class ArduinoMessageComponent extends AbstractSubscriptionComponent
  implements OnInit {
  public sendMessage = '';

  @ViewChild('messageView', { static: false }) messageView: ElementRef<
    HTMLDivElement
  >;

  public messages: ArduinoMessage[] = this.identityService.isBrowser()
    ? [
        {
          type: 'Arduino',
          message: 'Hello From Arduino Land.',
          time: '2:30:08 PM'
        },
        {
          type: 'Computer',
          message: 'Hello From computer Land.',
          time: '2:33:06 PM'
        },
        {
          type: 'Arduino',
          message: 'Hello From Arduino Land.',
          time: '2:40:03 PM'
        },
        {
          type: 'Computer',
          message: 'Hello From computer Land.',
          time: '2:44:03 PM'
        },
        {
          type: 'Arduino',
          message: 'Hello From Arduino Land.',
          time: '2:50:05 PM'
        },
        {
          type: 'Computer',
          message: 'Hello From computer Land.',
          time: '3:00:01 PM'
        },
        {
          type: 'Arduino',
          message: 'Hello From Arduino Land.',
          time: '3:05:04 PM'
        }
      ]
    : [];

  clear() {
    this.messages = [];
  }

  message() {
    if (this.sendMessage === '') {
      return;
    }

    this.messages.push({
      type: 'Computer',
      message: this.sendMessage,
      time: new Date().toLocaleTimeString()
    });

    this.deviceCommunicator.sendMessage(
      DeviceMessageType.SEND_MESSAGE,
      this.sendMessage
    );

    // Hack to scroll to the bottom
    this.ngZone.run(() => {
      setTimeout(() => {
        this.messageView.nativeElement.scrollTo(
          0,
          this.messageView.nativeElement.scrollHeight
        );
      }, 10);
    });
  }

  constructor(
    private ngZone: NgZone,
    private identityService: IdentityService,
    private deviceCommunicator: WebCommunicator
  ) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.deviceCommunicator.message$.subscribe(message =>
        this.incomingMessage(message)
      )
    );
  }

  incomingMessage(arduinoMessage: string) {
    if (
      arduinoMessage.includes('DEBUG_BLOCK_') ||
      arduinoMessage.includes('**(|)')
    ) {
      return;
    }

    this.messages.push({
      type: 'Arduino',
      message: arduinoMessage.toString(),
      time: new Date().toLocaleTimeString()
    });

    // Hack to scroll to the bottom
    this.ngZone.run(() => {
      setTimeout(() => {
        this.messageView.nativeElement.scrollTo(
          0,
          this.messageView.nativeElement.scrollHeight
        );
      }, 10);
    });
  }
}
