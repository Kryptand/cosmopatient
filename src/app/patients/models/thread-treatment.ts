import {Treatment} from './treatment';
import {ThreadTreatmentDetail} from './thread-treatment-detail';

export interface ThreadTreatment extends Treatment {
    type: 'Thread';
    detail: ThreadTreatmentDetail[];
}
