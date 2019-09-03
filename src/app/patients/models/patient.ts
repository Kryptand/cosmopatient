import { Treatment } from './treatment';

export interface Patient{
    id:string;
    firstName:string;
    lastName:string;
    treatments:Treatment[];
}