import { Component, OnInit } from '@angular/core';
import { BlocklyService } from '../../services/blockly/blockly.service';
import {
  LessonModel,
  BillOfMaterialModel,
  SlideModel,
  StepModel,
  SlideModelType
} from '../../data/lessons/lesson-models';
import { LessonService } from '../../services/lesson/lesson.service';
import { AbstractSubscriptionComponent } from '../abstract-subscription.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material';
import * as _ from 'lodash';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent extends AbstractSubscriptionComponent
  implements OnInit {
  lessons = this.lessonService.lessons;

  selectedLesson: LessonModel;

  slideUrlPart = '';

  nextSlide = false;

  previousSlide = false;

  percentage = 0;

  src: SafeUrl | SafeResourceUrl;

  selectedSlide: SlideModel | BillOfMaterialModel | StepModel;

  constructor(
    private blocklyService: BlocklyService,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {
    super();
    this.route.params.subscribe(params => {
      this.selectedLesson = this.lessonService.getLessonByUrl(
        params['lesson_name']
      );
      this.slideUrlPart = _.isEmpty(params['part'])
        ? this.selectedLesson.slides[0].urlpart
        : params['part'];
      this.selectedSlide = this.selectedLesson.slides.find(
        slide => slide.urlpart === this.slideUrlPart
      );

      this.src = this.selectedSlide.type === SlideModelType.VIDEO ?
        this.domSanitizer.bypassSecurityTrustResourceUrl(this.selectedSlide.src) :
      this.domSanitizer.bypassSecurityTrustUrl(this.selectedSlide.src);

      const index = this.selectedLesson.slides.findIndex(
        slide => slide.urlpart === this.slideUrlPart
      );

      this.nextSlide = index < this.selectedLesson.slides.length - 1;

      this.previousSlide = index > 0;

      this.percentage = ((index + 1) / this.selectedLesson.slides.length) * 100;
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

  next() {
    const nextIndex =
      this.selectedLesson.slides.findIndex(
        slide => slide.urlpart === this.slideUrlPart
      ) + 1;

    const slideUrlPart = this.selectedLesson.slides[nextIndex].urlpart;

    this.router.navigate([
      '/lessons',
      this.selectedLesson.urlpart,
      slideUrlPart
    ]);
  }

  previous() {
    const nextIndex =
      this.selectedLesson.slides.findIndex(
        slide => slide.urlpart === this.slideUrlPart
      ) - 1;

    const slideUrlPart = this.selectedLesson.slides[nextIndex].urlpart;

    this.router.navigate([
      '/lessons',
      this.selectedLesson.urlpart,
      slideUrlPart
    ]);
  }
}
