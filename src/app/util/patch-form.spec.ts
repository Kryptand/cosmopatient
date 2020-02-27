import {
  NO_FORM_GROUP_ERROR,
  NO_VALUEOBJECT_ERROR,
  patchFormValue
} from './patch-form';
import {FormControl, FormGroup} from '@angular/forms';

const MOCK_FORM_GROUP = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl('')
});
const MOCK_FORM_VALUE = {
  firstName: 'The First',
  lastName: 'The Last'
};
describe('patchFormValue', () => {
  it('should throw an error if there is no valueObject provided', () => {
    expect(() => {
      patchFormValue(null, MOCK_FORM_GROUP);
    }).toThrowError(NO_VALUEOBJECT_ERROR);
  });
  it('should throw an error if there is undefined as valueObject provided', () => {
    expect(() => {
      patchFormValue(undefined, MOCK_FORM_GROUP);
    }).toThrowError(NO_VALUEOBJECT_ERROR);
  });
  it('should throw an error if there is an array as valueObject provided', async () => {
    expect(() => {
      patchFormValue([], MOCK_FORM_GROUP);
    }).toThrowError(NO_VALUEOBJECT_ERROR);
  });
  it('should throw an error if there is no formgroup provided', () => {
    expect(() => {
      patchFormValue(MOCK_FORM_VALUE, null);
    }).toThrowError(NO_FORM_GROUP_ERROR);
  });
  it('should throw an error if there is undefined as formgroup provided', () => {
    expect(() => {
      patchFormValue(MOCK_FORM_VALUE, undefined);
    }).toThrowError(NO_FORM_GROUP_ERROR);
  });
  it('should throw an error if there is an array as formgroup provided', async () => {
    expect(() => {
      patchFormValue(MOCK_FORM_VALUE, [] as any);
    }).toThrowError(NO_FORM_GROUP_ERROR);
  });
  it('should set the formvalues based on the valueObject', async () => {
    patchFormValue(MOCK_FORM_VALUE, MOCK_FORM_GROUP);
    expect(MOCK_FORM_GROUP.value).toEqual(MOCK_FORM_VALUE);
  });
});
