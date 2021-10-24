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
}