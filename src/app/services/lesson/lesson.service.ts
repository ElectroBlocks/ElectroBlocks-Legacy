import { Injectable } from '@angular/core';
import { lesson1, lesson2 } from '../../data/lessons';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  public readonly lessons = [lesson1, lesson2];

  constructor() {}

  public getLessonList() {
    return this.lessons.map(lesson => {
      return {
        id: lesson.id,
        name: lesson.title
      };
    });
  }

  public getLessonById(id: string) {
    return this.lessons.find(lesson => lesson.id === id);
  }
}
