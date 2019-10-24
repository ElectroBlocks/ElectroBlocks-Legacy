import { BlocklyService } from './core/services/blockly.service';
import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  NgZone,
  OnInit
} from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Router, ActivationStart } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blocklyContainerWidth = '49.5%';
  routerContainerWidth = '49.5%';
  showAppPlayer = false;
  isResizingDivs = false;

  showBottom$ = this.router.events.pipe(
    filter(event => event instanceof ActivationStart),
    filter(
      (event: ActivationStart) => event.snapshot.data['ignoreBottom'] === false
    ),
    map((event: ActivationStart) => event.snapshot.data['showBottom'])
  );

  @ViewChild('grabber', { static: false }) grabber: ElementRef<HTMLDivElement>;

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private blocklyService: BlocklyService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof ActivationStart &&
            this.blocklyService.getWorkSpace()
        ),
        map(
          (event: ActivationStart) => event.snapshot.data['showRunLoopOption']
        )
      )
      .subscribe(showRunLoopOption => {
        console.log(showRunLoopOption);
        this.blocklyService.showRunLoopOption(showRunLoopOption);
        this.blocklyService.showDebugMode(showRunLoopOption);
      });
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isResizingDivs) {
      return;
    }

    const totalWidth = document.querySelector('body').clientWidth;
    const blocklyWidth = (event.clientX / totalWidth) * 100 - 0.5;
    const routerContianerWidth = 100 - blocklyWidth - 1;

    this.blocklyContainerWidth = blocklyWidth + '%';
    this.routerContainerWidth = routerContianerWidth + '%';
    this.blocklyService.resizeWorkspace();
  }

  grabberMouseUp(event: MouseEvent) {
    this.isResizingDivs = false;
  }

  grabberMouseDown(event: MouseEvent) {
    this.isResizingDivs = true;
  }

  ngOnInit(): void {}
}
