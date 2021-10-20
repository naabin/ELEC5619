import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/User";

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {
    constructor(private readonly _httpClient: HttpClient) {
    }

    /**
     * Fetch user by id
     * @param id - user id
     */
    fetchUserById(id: number): Observable<User> {
        return this._httpClient.get(`/api/user/${id}`);
    }
}
