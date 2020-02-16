import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  BotoxRegion,
  BotoxRegionPersistor
} from '../../services/region-persistor.service';
import { BotoxTreatment } from '../../models/botox-treatment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { patchFormValue } from '../../../util/patch-form';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function mutateAmount(
  botoxTreatment: BotoxTreatment,
  region: string,
  amount = 1
) {
  const index = botoxTreatment.detail.findIndex(item => item.region === region);
  const treatment = this.botoxTreatment.detail[index];
  treatment.amount = treatment.amount + amount;
  botoxTreatment.detail[index] = treatment;
  return botoxTreatment;
}

@Component({
  selector: 'kryptand-botox-add-edit-treatment',
  templateUrl: './botox-add-edit-treatment.component.html',
  styleUrls: ['./botox-add-edit-treatment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxAddEditTreatmentComponent implements OnInit {
  @Input() botoxTreatment: BotoxTreatment;
  @Input() pricePerAmount: number;
  constructor(
    private formBuilder: FormBuilder,
    public regionPersistor: BotoxRegionPersistor,
    private cd: ChangeDetectorRef
  ) {}
  botoxRegions: BotoxRegion[];
  filteredOptions: Observable<BotoxRegion[]>[] = [];
  @Output() saveBotoxTreatmentEventTriggered: EventEmitter<
    BotoxTreatment
  > = new EventEmitter();
  botoxTreatmentForm = this.formBuilder.group({
    label: 'Botoxbehandlung',
    pricePerAmount: 0,
    price: 0,
    date: new Date(),
    detail: this.formBuilder.array([])
  });
  public ngOnInit() {
    this.regionPersistor.list().subscribe(values => {
      this.addItem();
      this.botoxRegions = values;
      this.cd.markForCheck();
    });
    if (this.pricePerAmount) {
      this.botoxTreatmentForm
        .get('pricePerAmount')
        .patchValue(this.pricePerAmount);
    }
    if (!this.botoxTreatment) {
      return;
    }
    patchFormValue(this.botoxTreatment, this.botoxTreatmentForm);
  }
  addItem(): void {
    const detail = this.botoxTreatmentForm.controls['detail'] as FormArray;
    detail.push(this.createTreatmentDetail());
    this.autocompleteManager(detail.length - 1);
  }
  autocompleteManager(index: number) {
    const arrayControl = this.botoxTreatmentForm.controls[
      'detail'
    ] as FormArray;
    this.filteredOptions[index] = arrayControl
      .at(index)
      .get('region')
      .valueChanges.pipe(
        startWith<string | BotoxRegion>(''),
        map(value => (typeof value !== 'string' ? value.title : value)),
        map(name => (name ? this.filter(name) : this.botoxRegions.slice()))
      );
  }

  displayFn(region?: string): string | undefined {
    return region ? region : undefined;
  }
  private filter(name: string): BotoxRegion[] {
    const filterValue = name.toLowerCase();
    return this.botoxRegions.filter(
      option => option.title.toLowerCase().indexOf(filterValue) === 0
    );
  }
  public save() {
    this.saveBotoxTreatmentEventTriggered.emit(this.botoxTreatmentForm.value);
  }

  increaseAmountAtIndex(index: number) {
    const detail = this.botoxTreatmentForm.get('detail') as FormArray;
    const itemsAt = detail.at(index) as FormGroup;
    const value = itemsAt.value;
    const updatedvalue = { ...value, amount: value.amount + 1 };
    detail.at(index).patchValue(updatedvalue);
  }

  decreaseAmountAtIndex(index: number) {
    const detail = this.botoxTreatmentForm.get('detail') as FormArray;
    const itemsAt = detail.at(index) as FormGroup;
    const value = itemsAt.value;
    const updatedvalue = { ...value, amount: value.amount - 1 };
    detail.at(index).patchValue(updatedvalue);
  }

  private createTreatmentDetail() {
    return this.formBuilder.group({
      region: '',
      amount: 0
    });
  }

  removeItem(i: number) {
    const detail = this.botoxTreatmentForm.get('detail') as FormArray;
    detail.removeAt(i);
  }
}
