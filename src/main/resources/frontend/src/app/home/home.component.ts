import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductHttpService} from "../http/product.http.service";
import {ProductDetail} from "../entities/ProductDetail";
import {RentNavComponent} from "../rent-nav/rent-nav.component";
import {NavServiceService} from "../rent-nav/nav-service.service";

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
                private readonly _navService: NavServiceService) {
    }

    ngOnInit(): void {
        this._productHttpService.fetchProductList().subscribe((products) => {
            this.products = products;

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
        })
    }

    navigateToDetail(productNum: number) {
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
}
