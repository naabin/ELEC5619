import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDetail} from "../entities/ProductDetail";
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductDetailHttpService {

    constructor(private readonly _httpClient: HttpClient) {
    }

    fetchProductDetailById(id: number): Observable<ProductDetail> {
        // mocked return details
        return of({
            id: 1,
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
