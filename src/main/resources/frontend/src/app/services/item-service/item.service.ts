import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/entities/Item';
import { url } from 'src/util/remoteUrl';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private remoteUrl = url;

  constructor(private http: HttpClient) { }

  addItem(item: Item, userId: number): Observable<any> {
    return this.http.post<Item>(this.remoteUrl + `/api/item/${userId}`, JSON.stringify(item), this.httpOptions);
  }

  getAllBySearchQuery(searchQuery: string): Observable<Item[]> {
    return this.http.get<Item[]>(this.remoteUrl + `/public/items/get-all`, {params: {search: searchQuery}});
  }

  getItemsByLenderId(lenderId?: number) {
    return this.http.get<Item[]>(this.remoteUrl + `/api/item/lender-items/${lenderId}`);
  }

  getNearbyItems(): Observable<Item[]> {
      const user = JSON.parse(localStorage.getItem('user') || '');
      if (user && user?.id) {
        return this.http.get<Item[]>(`${this.remoteUrl}/api/item/get-items-nearby/${user?.id}`, {})
      }
      throw Error();
  }

  processPayment(chargeRequest: any, itemId?: number) {
      return this.http.post(`/api/payment/process/${itemId}`, JSON.stringify(chargeRequest), this.httpOptions);
  }

  getAllItems(): Observable<Item[]> {
      return this.http.get<Item[]>(`api/public/items/get-all`, {params: {search: ''}});
  }

  advancedSearch(category: string, maxPrice: number, minimumRating: number): Observable<Item[]> {
      return this.http.get<Item[]>(`/api/public/items/advance-search`, {params: {
          category, maxPrice, minimumRating: minimumRating ? minimumRating : 0
      }});
  }
}
