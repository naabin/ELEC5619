import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user-services/user-service.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-rent-nav',
  templateUrl: './rent-nav.component.html',
  styleUrls: ['./rent-nav.component.css']
})
export class RentNavComponent implements OnInit {
  bsModalRef: BsModalRef;
  isActive$ = this.userService.currentUserValue;
  constructor(private modalService: BsModalService, private router: Router, private userService: UserService) { }

  openSignupModal() {
    this.bsModalRef = this.modalService.show(SignupComponent, {});
  }

  openLoginModal() {
    this.bsModalRef = this.modalService.show(LoginComponent, {});
  }

  ngOnInit(): void {
    console.log(this.isActive$.value);
  }
}
