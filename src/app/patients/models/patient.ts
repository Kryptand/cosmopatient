import { Treatment } from './treatment';
export enum Gender {
  Male,
  Female,
  Diverse
}
export class Patient {
  id: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  street: string;
  streetNo: number;
  city: string;
  zipCode: string;
  birthday: Date;
}
