import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductHttpService} from "../http/product.http.service";
import {ProductDetail} from "../entities/ProductDetail";
import {NavServiceService} from "../rent-nav/nav-service.service";
import { ItemService } from '../services/item-service/item.service';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../entities/Item';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    private map:any;
    searchedItemName = '';

    products: ProductDetail[] = [];

    constructor(private readonly _router: Router,
                private readonly _productHttpService: ProductHttpService,
                private itemService: ItemService,
                private readonly _navService: NavServiceService) {
    }
    ngAfterViewInit(): void {
        this.initMap();
    }

    searchForm = new FormGroup({
        search: new FormControl('')
      });
    searchedItems: Item[];
    searching = false;

    searchItems(searchQuery: string) {
        const subject = new BehaviorSubject<string>(searchQuery);
        subject.pipe(
          switchMap((searchValue) => {
            this.searching = true;
            return this.itemService.getAllBySearchQuery(searchValue);
          })
        ).subscribe((data) => {
          console.log(data);
          this.searchedItems = data;
        })
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

    private initMap(): void {
        this.map = L.map('map', {
            center: [ 45.8282, -98.5795 ],
            zoom: 3
        });

        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);

        const marker1 = L.marker([39.8282, -101.5795])
        marker1.addTo(this.map)

        const marker2 = L.marker([46.8282, -101.5795])
        marker2.addTo(this.map)
    }
}
