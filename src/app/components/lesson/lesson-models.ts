export interface LessonModel {
  title: string;
  author: string;
  objective: string;
  image: string;
  billOfMaterial: Array<{ name: string; cost: string; quantity: number }>;
  slides: SlideModel[];
  googleFormUrl: string;
}

export interface SlideModel {
  title: string;
  src: string;
  text: string;
  type:
    | 'STEP'
    | 'VIDEO'
    | 'IMAGE'
    | 'VIDEO_CHALLENGE_QUESTION'
    | 'VIDEO_CHALLENGE_ANSWER'
    | string;
  step?: number;
}
