import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { ArduinoMessage } from '../../core/services/usb-communicator';

@Component({
  selector: 'app-arduino-message',
  templateUrl: './arduino-message.component.html',
  styleUrls: ['./arduino-message.component.scss']
})
export class ArduinoMessageComponent implements OnInit {
  public sendMessage = '';

  @ViewChild('messageView', { static: false }) messageView: ElementRef<
    HTMLDivElement
  >;

  public messages: ArduinoMessage[] = [
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
  ];

  clear() {
    this.messages = [];
  }

  message() {
    if (this.sendMessage === '') {
      return;
    }
    this.messages.push({
      message: this.sendMessage,
      type: 'Computer',
      time: new Date().toLocaleTimeString()
    });

    // Hack to scroll to the bottom
    this.ngZone.run(() => {
      setTimeout(() => {
        this.messageView.nativeElement.scrollTo(
          0,
          this.messageView.nativeElement.clientHeight
        );
      }, 10);
    });
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}
}
