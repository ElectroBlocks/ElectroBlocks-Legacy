import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../../services/blockly/blockly.service';
import { LessonModel } from '../../data/lessons/lesson-models';
import { LessonService } from '../../services/lesson/lesson.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AbstractSubscriptionComponent } from '../abstract-subscription.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent extends AbstractSubscriptionComponent
  implements OnInit {
  lessons = this.lessonService.lessons;

  selectedLesson = this.lessons[0];

  lessonPicker = new FormControl(this.lessons[0].id);

  lessonSubs = this.lessonPicker.valueChanges.subscribe(lessonId => {
    this.selectedLesson = this.lessonService.getLessonById(lessonId);
  });

  constructor(
    private blocklyService: BlocklyService,
    private lessonService: LessonService
  ) {
    super();
  }

  ngOnInit() {
    if (this.blocklyService.getWorkSpace()) {
      this.blocklyService.resizeWorkspace();
    }
  }
}
