import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user-services/user-service.service';
import { User } from '../entities/User';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';


@Injectable({'providedIn': 'root'})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: UserService, private modalService: BsModalService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
        if(currentUser.value !== null){
            return true;
        }
         this.authService.checkValidJWT().subscribe({
            next: (res) => {
                console.log(res);
                if(res.tokenExpired){
                    localStorage.clear();
                    currentUser.next(new User());
                    return false;
                }
            },
            error: (err) => {
                if(err){
                    localStorage.clear();
                    currentUser.next(new User());
                    this.router.navigateByUrl('/');
                }
            }
        })
        // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url.toString()}});
        this.modalService.show(LoginComponent, {});
        return false;
    }
}
