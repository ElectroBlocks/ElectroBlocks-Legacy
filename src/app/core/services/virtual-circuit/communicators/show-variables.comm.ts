import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShowVariablesCommunicator {
  private showVariables = true;

  private showVariablesSubject = new Subject<boolean>();

  public readonly showsVariables$ = this.showVariablesSubject.asObservable();

  public setShowVariables(show: boolean) {
    this.showVariables = show;
    this.showVariablesSubject.next(show);
  }

  public getShowVariables() {
    return this.showVariables;
  }
}
