import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ItemHttpService} from "../http/item.http.service";
import {Item} from "../entities/Item";
import {CalculateUtil} from "../core/calculate.util";
import { ItemService } from '../services/item-service/item.service';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    applianceName: string | undefined = '';

    applianceCategory: string | undefined = '';
    rent: string | undefined = ''
    maxTotalPrice: string | undefined;
    location: string | undefined;
    rating: string | undefined;
    ratingArr: number[] = [];

    searchResults: Item[] = [];

    defaultFilterResult = 'N/A';

    constructor(private readonly _activatedRoute: ActivatedRoute,
                private itemService: ItemService,
                private readonly _itemHttpService: ItemHttpService) {
    }

    ngOnInit(): void {
        this._activatedRoute.queryParams.subscribe((queryParams) => {
            const {applianceCategory, maxTotalPrice, rating} = queryParams;
            this.itemService.advancedSearch(applianceCategory, maxTotalPrice, rating).subscribe(data => {
                this.searchResults = data;
            })
            this.applianceName = queryParams.applianceName;
            this.applianceCategory = queryParams.applianceCategory ?? this.defaultFilterResult;
            this.rent = queryParams.rent ?? this.defaultFilterResult;
            this.maxTotalPrice = queryParams.maxTotalPrice ?? this.defaultFilterResult;
            this.location = queryParams.location ?? this.defaultFilterResult;
            if (queryParams.rating) {
                const numRating = +queryParams.rating;
                this.ratingArr = [];
                for (let i = 0; i< numRating; i++) {
                    this.ratingArr.push(1);
                }
            }
            this.rating = queryParams.rating ?? this.defaultFilterResult;

            this._itemHttpService.fetchItemsByName(this.applianceName ?? '')
                .subscribe((items: Item[]) => {
                    this.searchResults = items.filter((item) => {
                        if (this.applianceCategory !== this.defaultFilterResult && item.category.indexOf(this.applianceCategory!) < 0) {
                            return false;
                        }
                        if (this.maxTotalPrice !== this.defaultFilterResult && +this.maxTotalPrice! < item.itemPrice) {
                            return false;
                        }
                        // TODO: Please add rent / distance / rating calculate logic
                        return true;
                    }).map(item => CalculateUtil.calcStarNum(item));
                });
        })
    }

    get isSimpleSearch(): boolean {
        return typeof this.applianceName === 'string';
    }

}
