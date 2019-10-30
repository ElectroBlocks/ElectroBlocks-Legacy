import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VariablesComponent } from './virtual-circuit/settings/variables/variables.component';
import { SettingsContainerComponent } from './virtual-circuit/settings-container/settings-container.component';
import { VirtualCircuitContainerComponent } from './virtual-circuit/virtual-circuit-container/virtual-circuit-container.component';
import { SvgComponent } from './virtual-circuit/svg/svg.component';
import { PlayerComponent } from './player/player.component';
import { CodeComponent } from './code/code.component';
import { BlocklyComponent } from './blockly/blockly.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { ElectronService } from './core/services';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatOptionModule,
  MatSlideToggleModule,
  MatIconModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { WebMenuComponent } from './web-menu/web-menu.component';
import * as vsFactory from './core/services/virtual-circuit/factory/virtual-circuit.factory';
import { VirtualCircuit } from './core/services/virtual-circuit/svg/virtual-circuit';

describe('AppComponent', () => {
  beforeEach(async(() => {
    spyOn(vsFactory, 'virtualCircuitFactory').and.callFake(async (ex) => {
      console.log('testing call fake virtual circuit');
      return {} as VirtualCircuit;
    });
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BlocklyComponent,
        CodeComponent,
        PlayerComponent,
        SvgComponent,
        VirtualCircuitContainerComponent,
        SettingsContainerComponent,
        VariablesComponent,
        WebMenuComponent
      ],
      providers: [ElectronService],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSlideToggleModule,
        MatIconModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

class TranslateServiceStub {
  setDefaultLang(lang: string): void {}
}
