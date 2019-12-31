import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  public readonly chromebookApp = false;

  get isElectron() {
    return window && window.process && window.process['type'];
  }

  public isBrowser() {
    return !this.isElectron && !this.chromebookApp;
  }

  public isChromebookApp() {
    return this.chromebookApp;
  }
}
