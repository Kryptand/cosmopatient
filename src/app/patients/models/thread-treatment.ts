import {Treatment} from './treatment';
import {TreatmentDetail} from './treatment-detail';

export interface ThreadTreatment extends Treatment {
  type: 'Thread';
  detail: TreatmentDetail[];
}
