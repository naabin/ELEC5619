import {Component, OnInit} from '@angular/core';
import {ProductHttpService} from "../http/product.http.service";
import {ActivatedRoute} from "@angular/router";
import {ProductDetail} from "../entities/ProductDetail";
import {ToastrService} from "ngx-toastr";
import {ItemHttpService} from "../http/item.http.service";
import {Item} from "../entities/Item";
import {CalculateUtil} from "../core/calculate.util";

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    item: Item;

    selectedRateDay = false;
    selectedRateWeek = false;
    selectedRateMonth = false;

    targetDay: number;
    targetWeek: number;
    targetMonth: number;

    constructor(private readonly _itemHttpService: ItemHttpService,
                private readonly _activatedRoute: ActivatedRoute,
                private readonly _toaster: ToastrService) {
    }

    ngOnInit(): void {
        this._itemHttpService.fetchItemById(this._activatedRoute.snapshot.params.id)
            .subscribe((item: Item) => {
                this.item = item;
                CalculateUtil.calcStarNum(this.item);
            })

    }

    payment() {
        if (this.total) {
            this._toaster.success("Pay Successfully!");
        } else {
            this._toaster.error("Please select your rent for!");
        }
    }

    get total(): number {
        let total = 0;
        if (this.selectedRateDay) {
            total += this.targetDay * this.item.itemInformation.rentalPricePerDay! ? this.targetDay * this.item.itemInformation.rentalPricePerDay! : 0;
        }
        if (this.selectedRateWeek) {
            total += this.targetWeek * this.item.itemInformation.rentalPricePerWeek! ? this.targetWeek * this.item.itemInformation.rentalPricePerWeek! : 0;
        }
        if (this.selectedRateMonth) {
            total += this.targetMonth * this.item.itemInformation.rentalPricePerMonth! ? this.targetMonth * this.item.itemInformation.rentalPricePerMonth! : 0;
        }
        return total;
    }
}
