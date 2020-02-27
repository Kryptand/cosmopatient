import {FormGroup} from '@angular/forms';

export const NO_VALUEOBJECT_ERROR = 'no ValueObject provided';
export const NO_FORM_GROUP_ERROR = 'no FormGroup provided';

export const patchFormValue = (valueObject: Object, formGroup: FormGroup) => {
    if (
        !valueObject ||
        (typeof valueObject !== 'object' || Array.isArray(valueObject))
    ) {
        throw new Error(NO_VALUEOBJECT_ERROR);
    }
    if (
        !formGroup ||
        (typeof formGroup !== 'object' || Array.isArray(formGroup))
    ) {
        throw new Error(NO_FORM_GROUP_ERROR);
    }
    Object.keys(valueObject).map(key => {
        if (valueObject[key]) {
            formGroup.controls[key].patchValue(valueObject[key]);
        }
    });
};
