import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NavServiceService {

    public openRegistryDialogSub: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public openRegistryDialog$: Observable<number> = this.openRegistryDialogSub.asObservable();

    constructor() {
    }
}
