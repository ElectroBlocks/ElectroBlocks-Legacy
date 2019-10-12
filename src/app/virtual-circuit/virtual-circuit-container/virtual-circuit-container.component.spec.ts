import { DisplaySettingsComponent } from './../settings/display-settings/display-settings.component';
import { SettingsContainerComponent } from './../settings-container/settings-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCircuitContainerComponent } from './virtual-circuit-container.component';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';
import { SvgComponent } from '../svg/svg.component';
import { VariablesComponent } from '../settings/variables/variables.component';
import { SensorComponent } from '../settings/sensor/sensor.component';

describe('VirtualCircuitContainerComponent', () => {
  let component: VirtualCircuitContainerComponent;
  let fixture: ComponentFixture<VirtualCircuitContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VirtualCircuitContainerComponent,
        SvgComponent,
        SettingsContainerComponent,
        VariablesComponent,
        SensorComponent,
        DisplaySettingsComponent
      ],
      imports: [
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualCircuitContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
