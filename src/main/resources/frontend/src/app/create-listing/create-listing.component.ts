import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Item} from "../entities/Item";
import {ItemHttpService} from "../http/item.http.service";
import {User} from "../entities/User";
import { Router } from '@angular/router';

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

    createdItem: Item;


    currentUser: User | null = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null;

    afuConfig: any;

    constructor(private readonly _toastr: ToastrService,
                private readonly _itemHttpService: ItemHttpService,
                private readonly _router: Router) {
    }

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
                                                    // calculate condition
                                                    const condition = [];
                                                    if (this.conditionExcellent) {
                                                        condition.push('Excellent');
                                                    }
                                                    if (this.conditionGood) {
                                                        condition.push('Good');
                                                    }
                                                    if (this.conditionBelowAverage) {
                                                        condition.push('Below Average');
                                                    }
                                                    if (this.conditionRequiresMantenance) {
                                                        condition.push('Requires Maintenance');
                                                    }

                                                    // send request
                                                    this._itemHttpService.createItem({
                                                        "itemName": this.titleOfAdvertisement,
                                                        "category": this.category,
                                                        "itemInformation": {
                                                            "brand": this.brand,
                                                            "modelNumber": this.modelNumber,
                                                            "serialNumber": this.serialNumber,
                                                            "itemCondition": condition.join(", "),
                                                            "rentalPricePerDay": this.rentalPricePerDay,
                                                            "rentalPricePerWeek": this.rentalPricePerWeek,
                                                            "rentalPricePerMonth": this.rentalPricePerMonth,
                                                            "yearPurchased": +this.yearPurchased
                                                        },
                                                        "itemDescription": this.description,
                                                        "itemPrice": 0,
                                                        "available": true,
                                                        "availableFrom": new Date()
                                                    }).subscribe((item) => {
                                                        this.createdItem = item;
                                                        this.afuConfig = {
                                                            multiple: false,
                                                            formatsAllowed: ".jpg,.png",
                                                            uploadAPI: {
                                                                url: `http://localhost:8080/api/item/upload-image/${item.id}`,
                                                                headers: {
                                                                    "Authorization": `Bearer ${this.currentUser?.token}`
                                                                },
                                                                withCredentials: false,
                                                            },
                                                            theme: "attachPin"
                                                        };
                                                    })
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

    finish() {
        this._toastr.success('Create Successfully!');
        this._router.navigate(["/"]);
    }
}
