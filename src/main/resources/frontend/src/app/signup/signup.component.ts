import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../entities/Address';
import { User } from '../entities/User';
import { UserService } from '../services/user-services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  lat: number;
  lng: number;

  constructor(
    private userService: UserService,
    private readonly _bsModalRef: BsModalRef,
    private readonly _fb: FormBuilder,
    private readonly _toastr: ToastrService) {
    this.signUpForm = _fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    })
  }
    ngOnInit(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                if (position) {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    console.log("Lat: " + this.lat + " Lng: " + this.lng);
                }
            })
        }
    }



  hideModal() {
    this._bsModalRef.hide();
  }

  register() {
    if (this.signUpForm.valid) {
      let user = new User();
      user.username = this.signUpForm.get('username')?.value;
      user.password = this.signUpForm.get('password')?.value;
      user.email = this.signUpForm.get('email')?.value;
      let address = new Address();
      address.streetAddress = this.signUpForm.get('address')?.value;
      address.lat = this.lat;
      address.lng = this.lng;
      user.address = address;
      this.userService.registerUser(user).subscribe(data => {
        // console.log(data);
        this._toastr.success('Register Successfully!');
        // emit the user info
        this._bsModalRef.onHide?.emit(this.signUpForm.value);
        this._bsModalRef.hide();
      }, () => {
          this._toastr.error("Unkown error occurred. Please try again later");
      })
    }
  }
}
