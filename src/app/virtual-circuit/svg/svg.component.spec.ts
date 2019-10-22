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
import { RouterTestingModule } from '@angular/router/testing';
import { BlocklyService } from '../../core/services/blockly.service';

describe('SvgComponent', () => {
  let component: SvgComponent;
  let fixture: ComponentFixture<SvgComponent>;

  beforeEach(async(() => {
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
