import { BlocklyService } from './../core/services/blockly.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'blockly';
import { BlocklyComponent } from './blockly.component';

describe('BlocklyComponent', () => {
  let component: BlocklyComponent;
  let fixture: ComponentFixture<BlocklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlocklyComponent],
      providers: [BlocklyService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
