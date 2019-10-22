import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VariablesComponent } from './../settings/variables/variables.component';
import { VirtualCircuitContainerComponent } from './../virtual-circuit-container/virtual-circuit-container.component';
import { SvgComponent } from './../svg/svg.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsContainerComponent } from './settings-container.component';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

describe('SettingsContainerComponent', () => {
  let component: SettingsContainerComponent;
  let fixture: ComponentFixture<SettingsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsContainerComponent,
        SvgComponent,
        VirtualCircuitContainerComponent,
        SettingsContainerComponent,
        VariablesComponent
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
    fixture = TestBed.createComponent(SettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
