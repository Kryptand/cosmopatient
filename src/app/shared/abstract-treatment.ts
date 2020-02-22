import {FormArray, FormGroup} from '@angular/forms';
import {AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractEntityAddEditComponent} from './abstract-add-edit-component';
import {FormComponent} from './form/form.component';
import {AbstractProductType} from './abstract-type';
import {Subscription} from 'rxjs';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {AbstractPersistor} from '../util/abstract-persistor';

function updateAmountAndPrice(
    v,
    formGroup: FormGroup,
    pricePerUnit: number,
    regions: any[],
    cd: ChangeDetectorRef,
    regionProperty = 'region',
    amountProperty = 'amount'
) {
    const detailArr = formGroup.controls.detail as FormArray;
    let medicineAmount = 0;
    v.detail.forEach((detailEntry, idx, arr) => {
        if (detailEntry[amountProperty]) {
            medicineAmount += parseFloat(detailEntry[amountProperty]);
        }
        const region = detailArr.at(idx).get(regionProperty);
        const amount = detailArr.at(idx).get(amountProperty);
        if ((amount.value && !region.value) || amount.dirty) {
            return;
        }
        const foundRegion = regions.find(
            listedRegion => listedRegion.title === region.value
        );
        if (foundRegion) {
            setTimeout(() => amount.patchValue(foundRegion.suggestedAmount), 0);
        }
    });
    const price = formGroup.get('price');
    if (pricePerUnit) {
        console.debug(new Date());
        console.debug(medicineAmount);
        const total = medicineAmount * pricePerUnit;
        price.patchValue(total);
        cd.markForCheck();
    }
}

export abstract class AbstractTreatmentForm<T> extends AbstractEntityAddEditComponent<T> implements AfterViewInit, OnDestroy, OnInit {
    @ViewChild('form') formComponent: FormComponent;
    selectedProductType: AbstractProductType;
    regions: any[];

    regionSubscription: Subscription;
    formSubscription: Subscription;
    abstract fieldConfig: FormlyFieldConfig[];

    constructor(protected typePersistor: AbstractPersistor<any>, protected regionPersistor: AbstractPersistor<any>, protected cd: ChangeDetectorRef) {
        super();
    }

    ngAfterViewInit(): void {
        let previousValue = {};
        this.formSubscription = this.formComponent.formGroup.valueChanges.subscribe(
            v => {
                if (v.type) {
                    this.typePersistor
                        .getSingle(v.type)
                        .subscribe(type => (this.selectedProductType = type));
                }
                if (
                    !v.detail ||
                    JSON.stringify(v.detail) === JSON.stringify(previousValue)
                ) {
                    return;
                }
                previousValue = v.detail;
                updateAmountAndPrice(v, this.formComponent.formGroup, this.selectedProductType?.pricePerUnit, this.regions, this.cd);
            }
        );
    }

    ngOnDestroy(): void {
        this.regionSubscription && this.regionSubscription.unsubscribe();
        this.formSubscription && this.formSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.regionSubscription = this.regionPersistor
            .list()
            .subscribe(regions => {
                this.regions = regions;
            });
    }

    save() {
        this.saveEntity.emit(this.formComponent.formGroup.value);
    }

    formGroup: FormGroup = new FormGroup({});

}
