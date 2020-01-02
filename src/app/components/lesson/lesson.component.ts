import { Component, OnInit } from '@angular/core';
import * as pageMarkdown from 'raw-loader!./main/arduino-intro-lesson-1.md';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  currentLesson = pageMarkdown.default;
  constructor() {}

  ngOnInit() {}
}
