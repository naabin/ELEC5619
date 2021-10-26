import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDetail} from "../entities/ProductDetail";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductHttpService {

    constructor(private readonly _httpClient: HttpClient) {
    }

    fetchProductList(): Observable<ProductDetail[]> {
        return of([{
            id: 1,
            rateNum: 4.5,
            reviewNum: 15,
            imagePathOne: 'item1.jpeg',
            itemDescription: 'Dyson V7 Motorhead Cordless Vacuum is suitable for carpets and hard flooring.',
            category: 'Vacuum Cleaner',
            brand: 'Dyson',
            ratePerDay: 3,
            ratePerWeek: 10
        }, {
            id: 2,
            rateNum: 4,
            reviewNum: 30,
            imagePathOne: 'item2.png',
            itemDescription: 'The vitreous enamel grill and hotplate and large glass hood window make it an ideal BBQ',
            category: 'BBQ',
            brand: 'Matador',
            ratePerDay: 10,
            ratePerWeek: 40
        }, {
            id: 3,
            rateNum: 5,
            reviewNum: 3,
            imagePathOne: 'item3.png',
            itemDescription: 'Can aid with mixing, dough kneading, whipping, pasta rolling, and meat grinding',
            category: 'Mixer',
            brand: 'KitchenAid',
            ratePerDay: 3,
            ratePerWeek: 12
        }, {
            id: 4,
            rateNum: 3.5,
            reviewNum: 12,
            imagePathOne: 'item4.png',
            itemDescription: 'Ideal for cleaning cars, decks, pavers & many other outdoor areas',
            category: 'Pressure Cleaner',
            brand: 'Karcher',
            ratePerDay: 7,
            ratePerWeek: 30
        }]);
    }

    fetchProductDetailById(id: number): Observable<ProductDetail> {
        // mocked return details
        return of({
            itemName: 'Excellent BBQ - Perfect for large gatherings',
            rateNum: 4.5,
            reviewNum: 15,
            positionName: 'Strathfield, NSW',
            positionDistance: 5,
            imagePathOne: 'image1.png',
            imagePathTwo: 'image2.png',
            imagePathThree: 'image3.png',
            itemDescription: 'The Matador 4 Burner Hooded Conquest BBQ with\n' +
                '      side burner is the perfect BBQ for family entertaining. With cast iron burners, Grillsmart cast iron cooking\n' +
                '      surfaces and enamel-coated warming rack, this BBQ is perfect for cooking up a feast.<br><br>Includes:&nbsp;<br>&nbsp;-\n' +
                '      Fingerprint free 304 grade stainless steel<br>- Viewing windows with temperature gauge<br>- Internal cylinder\n' +
                '      storage<br>- Side burner, grills and hotplates.&nbsp;',
            category: 'BBQ',
            brand: 'Matador',
            modelNum: 'M12345678',
            serialNum: 'S98765432',
            yearPurchased: '2019',
            condition: 'Excellent',
            lender: {
                avatar: 'lender-user1.png',
                name: 'Jessica',
                address: {
                    country: 'Camperdown'
                }
            },
            ratePerDay: 10,
            ratePerWeek: 50,
            ratePerMonth: 150
        })
    }
}
