import { LessonModel, SlideModelType } from './lesson-models';

export const lesson1: LessonModel = {
  author: 'Noah Glaser',
  title: 'Arduino Introduction',
  urlpart: 'lesson-1-arduino-introduction',
  billOfMaterial: [
    {
      cost: '7.00',
      name: 'Arduino with cables',
      quantity: 1
    }
  ],
  googleFormUrl: 'blah',
  image:
    'https://github.com/phptuts/codingwithnoah/blob/master/images/arduino-block/arduino-intro/project.jpg',
  objective: 'To learn how the Arduino Works!',
  slides: [
    {
      urlpart: 'what-is-an-arduino',
      step: 0,
      title: 'What is an Arduino?',
      src:
        'http://www.codingwithnoah.com/images/arduino-block/arduino-intro/arduino.jpg',
      type: SlideModelType.IMAGE,
      text:
        // tslint:disable-next-line: max-line-length
        'The Arduino is a cheap real time computer that costs around 7 dollars. Real time means that will execute your code really fast. It can do this because there is no operating system running on the Arduino. The only thing it’s doing is running your code. :)'
    }
  ]
};
