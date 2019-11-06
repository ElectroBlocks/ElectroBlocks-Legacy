import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronMenuComponent } from './electron-menu.component';

describe('ElectronMenuComponent', () => {
  let component: ElectronMenuComponent;
  let fixture: ComponentFixture<ElectronMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
