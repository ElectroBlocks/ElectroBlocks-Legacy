import { Injectable } from '@angular/core';
import { lesson1, lesson2 } from '../../data/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  public readonly lessons = [lesson1, lesson2];

  constructor() {}

  public getLessonByUrl(urlpart: string) {
    return this.lessons.find(lesson => lesson.urlpart === urlpart);
  }
}
