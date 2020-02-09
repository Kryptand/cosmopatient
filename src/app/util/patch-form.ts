import { FormGroup } from '@angular/forms';

export const patchFormValue = (valueObject: any, formGroup: FormGroup) => {
  if (!valueObject) {
    throw new Error('no ValueObject provided');
  }
  if (!formGroup) {
    throw new Error('no FormGroup provided');
  }
  Object.keys(valueObject).map(key => {
    if (valueObject[key]) {
      formGroup.controls[key].patchValue(valueObject[key]);
    }
  });
};
