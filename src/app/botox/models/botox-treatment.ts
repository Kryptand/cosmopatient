import { TreatmentDetail } from '../../patients/models/treatment-detail';
import { Treatment } from '../../patients/models/treatment';

export interface BotoxTreatment extends Treatment {
  type: 'Botox';
  detail: TreatmentDetail[];
  pricePerAmount: number;
}
