import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgComponent } from './svg.component';
import {
  MatTabsModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlocklyService } from '../../core/services/blockly.service';
import * as vsFactory from '../../core/services/virtual-circuit/factory/virtual-circuit.factory';
import { VirtualCircuit } from '../../core/services/virtual-circuit/svg/virtual-circuit';

describe('SvgComponent', () => {
  let component: SvgComponent;
  let fixture: ComponentFixture<SvgComponent>;

  beforeEach(async(() => {
    spyOn(vsFactory, 'virtualCircuitFactory').and.callFake(async (ex) => {
      console.log('testing call fake virtual circuit');
      return {} as VirtualCircuit;
    });
    TestBed.configureTestingModule({
      declarations: [SvgComponent],
      imports: [
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        MatIconModule,
        MatSlideToggleModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: BlocklyService,
          useValue: {
            resizeWorkspace() {}
          },
          multi: false
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
