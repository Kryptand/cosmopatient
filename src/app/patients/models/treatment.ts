import {Photo} from './photo';
import {Key} from '../../shared/key-decorator';
export type TreatmentType = 'Botox' | 'Thread' | 'Custom';

export class Treatment {
  @Key id: string;
  @Key patientId: string;
  photos: Photo[];
  label?: string;
  type: TreatmentType;
  date: Date;
  detail: any;
  price: number;
}
