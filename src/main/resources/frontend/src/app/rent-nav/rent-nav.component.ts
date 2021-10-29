import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {filter} from 'rxjs/internal/operators';
import {User} from '../entities/User';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {NavigationEnd, Router} from '@angular/router';
import {NavServiceService} from "./nav-service.service";

@Component({
    selector: 'app-rent-nav',
    templateUrl: './rent-nav.component.html',
    styleUrls: ['./rent-nav.component.css'],
})
export class RentNavComponent implements OnInit {
    faUserCircle = faUserCircle;

    currentUser: User | null = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null;

    bsModalRef: BsModalRef;

    // current page router url
    currentUrl = '/';

    constructor(
        private modalService: BsModalService,
        private readonly _router: Router,
        private readonly _navService: NavServiceService
    ) {
        _router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.currentUrl = event.url;
            });
        this._navService.openRegistryDialog$.subscribe((res) => {
            if (res === 1) {
                this.openSignupModal();
            }
        });
    }

    openSignupModal() {
        this.bsModalRef = this.modalService.show(SignupComponent, {});
        // filter the hide event, just keep the user info event
        this.bsModalRef.onHide
            ?.pipe(filter((res: any) => res.username))
            .subscribe((currentUser) => {
                this.currentUser = currentUser;
                // set the current user to localstorage
                localStorage.setItem('user', JSON.stringify(this.currentUser));
            });
    }

    openLoginModal() {
        this.bsModalRef = this.modalService.show(LoginComponent, {});
        // filter the hide event, just keep the user info event
        this.bsModalRef.onHide
            ?.pipe(filter((res: any) => res.username))
            .subscribe((currentUser) => {
                this.currentUser = currentUser;
                // set the current user to localstorage
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                localStorage.setItem('token', JSON.stringify(this.currentUser?.token));
            });
    }

    ngOnInit(): void {
    }

    logout() {
        this.currentUser = null;
        this._router.navigate(['/']);
        localStorage.clear();
    }
}
