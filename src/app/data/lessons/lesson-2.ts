import { LessonModel, SlideModelType } from './lesson-models';
import { v4 } from 'uuid';

export const lesson2: LessonModel = {
  id: v4(),
  author: 'Noah Glaser',
  title: 'Blink',
  billOfMaterial: [
    {
      cost: '$9.00 to $7.00',
      name: 'Arduino with cables',
      quantity: 1
    },
    {
      cost: '$2.00',
      name: 'breadboard',
      quantity: 1
    },
    {
      cost: '$0.50 to $1.00',
      name: 'leds',
      quantity: 5
    },
    {
      cost: '$0.25',
      name: 'resistors',
      quantity: 4
    },
    {
      cost: '$1.00',
      name: 'jumper wires',
      quantity: 10
    }
  ],
  googleFormUrl: 'blah',
  image:
    'https://github.com/phptuts/codingwithnoah/blob/master/images/arduino-block/arduino-intro/project.jpg',
  objective: 'To learn how the Arduino Works!',
  slides: [
    {
      step: 0,
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
