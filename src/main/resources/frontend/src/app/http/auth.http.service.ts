import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/User";

@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {
    constructor(private readonly _httpClient: HttpClient) {
    }

    /**
     * Login with username and password
     *
     * @param username
     * @param password
     */
    login(username: string, password: string): Observable<User> {
        return this._httpClient.post('/api/auth/authenticate', {
            "username": username,
            "password": password
        });
    }
}
