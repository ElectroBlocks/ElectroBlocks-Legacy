import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMenuComponent } from './web-menu.component';

describe('WebMenuComponent', () => {
  let component: WebMenuComponent;
  let fixture: ComponentFixture<WebMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
