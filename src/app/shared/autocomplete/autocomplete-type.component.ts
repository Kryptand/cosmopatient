import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, pipe } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'kryptand-autocomplete',
  templateUrl: './autocomplete-type.component.html',
  styleUrls: ['./autocomplete-type.component.scss']
})
export class AutocompleteTypeComponent extends FieldType {
  @ViewChild(MatInput) formFieldControl: MatInput;
  filter: Observable<any>;

  ngOnInit(): void {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(term => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = this.to.options as any;
        return options.pipe(
          map((options: string[]) => {
            return options.length
              ? options.filter(option =>
                option.toLocaleLowerCase().includes(term)
              )
              : [];
          })
        );
      })
    );
  }
}
