export interface LessonModel {
  title: string;
  author: string;
  objective: string;
  image: string;
  billOfMaterial: Array<{ name: string; cost: string; quantity: number }>;
  slides: SlideModel[];
  googleFormUrl: string;
  urlpart: string;
}

export interface SlideModel {
  title: string;
  src: string;
  text: string;
  type: SlideModelType;
  step?: number;
  urlpart: string;
}

export enum SlideModelType {
  'STEP' = 'STEP',
  'VIDEO' = 'VIDEO',
  'IMAGE' = 'IMAGE',
  'VIDEO_CHALLENGE_QUESTION' = 'VIDEO_CHALLENGE_QUESTION',
  'VIDEO_CHALLENGE_ANSWER' = 'VIDEO_CHALLENGE_ANSWER',
  'IMAGE_CHALLENGE_QUESTION' = 'IMAGE_CHALLENGE_QUESTION',
  'IMAGE_CHALLENGE_ANSWER' = 'IMAGE_CHALLENGE_ANSWER'
}
