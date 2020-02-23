import {Key} from '../../shared/key-decorator';

export class Photo {
    @Key id: string;
    @Key patientId: string;
    @Key treatmentId: string;
    content: string;
    fileName: string;
    createdAt: string;
}
