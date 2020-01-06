import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../../services/blockly/blockly.service';
import { LessonModel } from '../../data/lessons/lesson-models';
import { LessonService } from '../../services/lesson/lesson.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AbstractSubscriptionComponent } from '../abstract-subscription.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent extends AbstractSubscriptionComponent
  implements OnInit {
  lessons = this.lessonService.lessons;

  selectedLesson: LessonModel;

  constructor(
    private blocklyService: BlocklyService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.route.params.subscribe(params => {
      this.selectedLesson = this.lessonService.getLessonByUrl(
        params['lesson_name']
      );
    });
  }

  ngOnInit() {
    if (this.blocklyService.getWorkSpace()) {
      this.blocklyService.resizeWorkspace();
    }
  }

  changeLesson(event: MatSelectChange) {
    this.router.navigate(['/lessons', event.value]);
  }
}
