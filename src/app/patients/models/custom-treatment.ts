import { Treatment } from './treatment';

export interface CustomTreatment extends Treatment {
  type: 'Custom';
  detail: any;
}
