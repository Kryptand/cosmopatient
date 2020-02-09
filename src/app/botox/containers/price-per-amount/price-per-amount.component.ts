import { Component, OnInit } from '@angular/core';
import { PricePerAmountPersistor } from '../../services/price-per-amount-persistor.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kryptand-botox-price-per-amount',
  templateUrl: './price-per-amount.component.html',
  styleUrls: ['./price-per-amount.component.scss']
})
export class BotoxPricePerAmountComponent implements OnInit {
  pricePerAmountField: FormControl = new FormControl();
  constructor(private pricePerAmountPersistor: PricePerAmountPersistor) {}

  ngOnInit() {
    this.pricePerAmountPersistor.currentPrice().subscribe(price => {
      if (price) {
        this.pricePerAmountField.patchValue(price);
      }
    });
  }

  save() {
    const { value } = this.pricePerAmountField;
    this.pricePerAmountPersistor.save(value);
  }
}
