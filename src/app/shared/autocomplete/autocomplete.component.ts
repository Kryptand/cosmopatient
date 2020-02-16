import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'kryptand-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent extends FieldType {
  @ViewChild(MatInput) formFieldControl: MatInput;
  filter: Observable<any>;
  ngOnInit() {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(term => this.to.filter(term))
    );
  }
}
