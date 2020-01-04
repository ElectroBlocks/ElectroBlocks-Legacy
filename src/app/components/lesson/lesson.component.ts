import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../../services/blockly/blockly.service';
import { LessonModel } from './lesson-models';
import { default as lesson1 } from './lessons/lesson-1.json';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lesson: LessonModel = lesson1;

  constructor(private blocklyService: BlocklyService) {}

  ngOnInit() {
    if (this.blocklyService.getWorkSpace()) {
      this.blocklyService.resizeWorkspace();
    }
  }
}
