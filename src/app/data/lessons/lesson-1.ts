import { LessonModel, SlideModelType } from './lesson-models';

export const lesson1: LessonModel = {
  author: 'Noah Glaser',
  title: 'Arduino Introduction',
  urlpart: 'lesson-1-arduino-introduction',
  slides: [
    {
      urlpart: 'what-you-will-learn',
      title: 'What will you learn',
      src:
        'http://www.codingwithnoah.com/images/arduino-block/arduino-intro/arduino.jpg',
      type: SlideModelType.OBJECTIVE,
      text:
        'To learn all the parts of an Arduino and how to upload a piece of code with ElectroBlocks.'
    },
    {
      urlpart: 'bill-of-materials',
      title: 'Kit',
      src:
        'http://www.codingwithnoah.com/images/arduino-block/arduino-intro/arduino.jpg',
      type: SlideModelType.BILL_OF_MATERIALS,
      text: '',
      billOfMaterials: [
        {
          name: 'Arduino with cable',
          cost: '$7.00 to $9.00',
          quantity: 1
        }
      ]
    },
    {
      urlpart: 'what-is-an-arduino',
      title: 'What is an Arduino?',
      src: 'https://www.youtube.com/embed/CqrQmQqpHXc',
      type: SlideModelType.VIDEO,
      text:
        // tslint:disable-next-line: max-line-length
        'The Arduino is a cheap real time computer that costs around 7 dollars. Real time means that will execute your code really fast. It can do this because there is no operating system running on the Arduino. The only thing it’s doing is running your code. :)'
    }
  ]
};
