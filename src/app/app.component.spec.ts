import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplaySettingsComponent } from './virtual-circuit/settings/display-settings/display-settings.component';
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
import { SensorComponent } from './virtual-circuit/settings/sensor/sensor.component';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
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
        SensorComponent,
        DisplaySettingsComponent
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
        BrowserAnimationsModule
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
