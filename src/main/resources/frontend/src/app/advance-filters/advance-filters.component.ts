import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-advance-filters',
    templateUrl: './advance-filters.component.html',
    styleUrls: ['./advance-filters.component.css']
})
export class AdvanceFiltersComponent implements OnInit {

    // header category search input
    applianceCategory = '';

    // rent time
    rentTime: number;
    rentDaySelected = false;
    rentWeekSelected = false;
    rentMonthSelected = false;

    // price
    maxPrice: number;
    totalPriceSelected = false;
    perPriceSelected = false;

    // location
    km1LocationSelected = false;
    km5LocationSelected = false;
    km10LocationSelected = false;
    km20LocationSelected = false;
    noneLocationSelected = false;

    // rating
    rating1Selected = false;
    rating2Selected = false;
    rating3Selected = false;
    rating4Selected = false;
    rating5Selected = false;

    constructor(private readonly _toaster: ToastrService) {
    }

    ngOnInit(): void {
    }

    onSearched(): void {
        if (!this.applianceCategory) {
            this._toaster.error("You should fill in the appliance category!", "Error!")
        } else {
            this._toaster.success("Search Successfully!", "Congratulations!")
        }
    }
}
