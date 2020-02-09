import { TreatmentDetail } from './treatment-detail';

export interface ThreadTreatmentDetail extends TreatmentDetail {
  type: string;
  priceForType: string;
}
