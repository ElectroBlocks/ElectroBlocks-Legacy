import { LessonModel, SlideModelType } from './lesson-models';

export const lesson2: LessonModel = {
  author: 'Noah Glaser',
  title: 'Blink',
  urlpart: 'lesson-2-blink',
  slides: [
    {
      urlpart: 'example-1',
      title: 'Blink',
      src:
        'http://www.codingwithnoah.com/images/arduino-block/arduino-intro/arduino.jpg',
      type: SlideModelType.IMAGE,
      text:
        // tslint:disable-next-line: max-line-length
        'The Arduino is a cheap real time computer that costs around 7 dollars. Real time means that will execute your code really fast. It can do this because there is no operating system running on the Arduino. The only thing it’s doing is running your code. :)'
    }
  ]
};
