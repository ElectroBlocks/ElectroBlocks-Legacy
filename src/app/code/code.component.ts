import { BlocklyService } from '../core/services/blockly.service';
import { Component, OnInit, NgZone } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components';
import 'prismjs/components/prism-c';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import { startWith, share, tap, map, delay } from 'rxjs/operators';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {
  public code$ = this.blocklyService.code$.pipe(
    map((code) => this.escapeHTML(code)),
    share(),
    startWith(''),
    delay(10),
    tap(() => this.resetPrism())
  );

  constructor(
    public readonly blocklyService: BlocklyService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      // HACK to make sure blockly loads
      this.blocklyService.resizeWorkspace();
    }, 10);
  }

  private escapeHTML(code: string) {
    return code
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /**
   *  TODO explain set timeout and zones
   */
  resetPrism() {
    // THIS IS A HACK FOR NOW
    setTimeout(() => {
      this.ngZone.run(() => {
        Prism.highlightAll();
      });
    }, 10);
  }
}
