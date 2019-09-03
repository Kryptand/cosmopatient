export interface Treatment{
    id:string;
    photos:Photo[];
    label:string;
    date:Date;
}
export interface Photo{
    id:string;
    content:string;
    fileName:string;
    createdAt:string;
}