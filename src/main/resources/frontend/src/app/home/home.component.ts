import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductHttpService} from "../http/product.http.service";
import {ProductDetail} from "../entities/ProductDetail";
import {RentNavComponent} from "../rent-nav/rent-nav.component";
import {NavServiceService} from "../rent-nav/nav-service.service";
import { ItemService } from '../services/item-service/item.service';
import { Item } from '../entities/Item';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    searchedItemName = '';

    products: ProductDetail[] = [];

    constructor(private readonly _router: Router,
                private readonly _productHttpService: ProductHttpService,
                private itemService: ItemService,
                private readonly _navService: NavServiceService) {
    }

    ngOnInit(): void {
        this.itemService.getAllItems().subscribe(data => {
            if (data.length > 0) {
                this.products = data;
            } else {
                this.products = this.getDummyData();
            }
        })
    }

    navigateToDetail(productNum: number | undefined) {
        this._router.navigate(["/product-detail", productNum])
    }

    /**
     * Apply search
     */
    applySearch() {
        this._router.navigate(["/search-result"], {
            queryParams: {
                applianceName: this.searchedItemName
            }
        });
    }

    /**
     * Execute nav service
     */
    execNav() {
        this._navService.openRegistryDialogSub.next(1);
    }

    getDummyData(): any {
        this._productHttpService.fetchProductList().subscribe((products) => {
            // calculate the full star and half star
            this.products.map((product) => {
                const totalHalfStar = product.rateNum! / 0.5;
                product.halfStar = totalHalfStar % 2;
                product.fullStarArr = [];
                for (let i = 0; i < product.rateNum!; i++) {
                    product.fullStarArr.push(1);
                }
                return product;
            })
            return products;
        })
    }

    getImage(item: any): string | null {
        console.log(item);
        if (item.images && item.images.length > 0) return item.images[0].imageUrl;
        else return null;
    }
}
