import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShowArduinoCommunicator {
  private showArduino = true;

  private showArduinoSubject = new Subject<boolean>();

  public readonly showArduino$ = this.showArduinoSubject.asObservable();

  public setShowArduino(show: boolean) {
    this.showArduino = show;
    this.showArduinoSubject.next(show);
  }

  public getShowArduino() {
    return this.showArduino;
  }
}
