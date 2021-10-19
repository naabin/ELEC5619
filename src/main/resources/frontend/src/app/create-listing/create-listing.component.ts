import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  titleOfAdvertisement = '';
  category = '';
  brand = '';
  modelNumber = '';
  serialNumber = '';

  conditionExcellent = false;
  conditionGood = false;
  conditionBelowAverage = false;
  conditionRequiresMantenance = false;

  yearPurchased = '';
  
  rentalPricePerDay: number;
  rentalPricePerWeek: number;
  rentalPricePerMonth: number;

  description = '';

  constructor(private readonly _toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitChanges() {
    if (this.titleOfAdvertisement) {
      if (this.category) {
        if (this.brand) {
          if (this.modelNumber) {
            if (this.serialNumber) {
              if (this.conditionExcellent || this.conditionGood || this.conditionBelowAverage || this.conditionRequiresMantenance) {
                if (this.yearPurchased) {
                  if (this.rentalPricePerDay) {
                    if (this.rentalPricePerWeek) {
                      if (this.rentalPricePerMonth) {
                        if (this.description) {
                          this._toastr.success('Success submit!');
                        } else {
                          this._toastr.error('Please input description!');
                        }
                      } else {
                        this._toastr.error('Please input rental price per month!');
                      }
                    } else {
                      this._toastr.error('Please input rental price per week!');
                    }
                  } else {
                    this._toastr.error('Please input rental price per day!');
                  }
                } else {
                  this._toastr.error('Please input year purchased!');
                }
              } else {
                this._toastr.error('Please at least select on condition!');
              }
            } else {
              this._toastr.error('Please input serial number!');
            }
          } else {
            this._toastr.error('Please input model number!');
          }
        } else {
          this._toastr.error('Please input brand!');
        }
      } else {
        this._toastr.error('Please input category!');
      }
    } else {
      this._toastr.error('Please input title of advertisement!');
    }
  }
}
