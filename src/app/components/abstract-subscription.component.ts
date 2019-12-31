import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class AbstractSubscriptionComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
