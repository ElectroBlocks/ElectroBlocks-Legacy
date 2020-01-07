export interface LessonModel {
  title: string;
  author: string;
  slides: Array<SlideModel | BillOfMaterialModel | StepModel>;
  urlpart: string;
}

export interface SlideModel {
  title: string;
  src: string;
  text: string;
  type: SlideModelType;
  urlpart: string;
}

export interface BillOfMaterialModel extends SlideModel {
  billOfMaterials: Array<{ name: string; cost: string; quantity: number }>;
  type: SlideModelType.BILL_OF_MATERIALS;
}

export interface StepModel extends SlideModel {
  stepNumber: number;
  type: SlideModelType.STEP;
}

export enum SlideModelType {
  'OBJECTIVE' = 'OBJECTIVE',
  'STEP' = 'STEP',
  'VIDEO' = 'VIDEO',
  'IMAGE' = 'IMAGE',
  'BILL_OF_MATERIALS' = 'BILL_OF_MATERIALS',
  'VIDEO_CHALLENGE_QUESTION' = 'VIDEO_CHALLENGE_QUESTION',
  'VIDEO_CHALLENGE_ANSWER' = 'VIDEO_CHALLENGE_ANSWER',
  'IMAGE_CHALLENGE_QUESTION' = 'IMAGE_CHALLENGE_QUESTION',
  'IMAGE_CHALLENGE_ANSWER' = 'IMAGE_CHALLENGE_ANSWER'
}
