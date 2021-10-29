import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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
    rentRange: string;

    // price
    maxPrice: string;

    // location
    distanceLocation: string;

    // rating
    rating: string;

    constructor(private readonly _toaster: ToastrService,
                private readonly _router: Router) {
    }

    ngOnInit(): void {
    }

    onSearched(): void {
        const params: {[key: string]: string} = {};
        if (this.applianceCategory) {
            params.applianceCategory = this.applianceCategory;
        }
        if (this.rentTime && this.rentRange) {
            params.rent = `${this.rentTime} ${this.rentRange}`;
        }
        if (this.maxPrice) {
            params.maxTotalPrice = this.maxPrice;
        }
        if (this.distanceLocation) {
            params.location = this.distanceLocation;
        }
        if (this.rating) {
            params.rating = this.rating;
        }
        this._router.navigate(["/search-result"], {
            queryParams: params
        });
    }
}
