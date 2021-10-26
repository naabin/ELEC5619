import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/User";
import {Item} from "../entities/Item";

@Injectable({
    providedIn: 'root'
})
export class ItemHttpService {

    currentUser: User | null = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null;

    constructor(private readonly _httpClient: HttpClient) {
    }

    /**
     * Create item
     * @param item
     */
    createItem(item: Item): Observable<Item> {
        return this._httpClient.post<Item>(`/api/item/create/${this.currentUser?.id}`, item);
    }
}
