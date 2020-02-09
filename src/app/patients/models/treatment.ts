import { Photo } from './photo';
export type TreatmentType = 'Botox' | 'Thread' | 'Custom';

export interface Treatment {
  id: string;
  photos: Photo[];
  label?: string;
  type: TreatmentType;
  date: Date;
  detail: any;
  price: number;
}
