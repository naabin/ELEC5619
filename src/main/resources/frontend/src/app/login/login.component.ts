import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from '../entities/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // mocked user info
  mockedUser: User = {
    name: 'Lin',
    username: 'admin',
    password: '123456',
    email: 'lin@gmail.com',
    phone: '18842688552',
    address: {
      streetAddress: 'Street Address',
      suburb: 'Suburb',
      state: 'State',
      postcode: 'PostCode',
    },
    payment: {
      nameOnCard: 'MasterCard',
      cardNumber: 'XXXX-XXXX-XXXX-1234',
      expiryDate: new Date('2021-11-10'),
    },
  };

  loginForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _bsModalRef: BsModalRef,
    private readonly _toastr: ToastrService
  ) {
    this.loginForm = _fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  hideModal() {
    this._bsModalRef.hide();
  }

  mockedValidateUser() {
    const currentInput = this.loginForm.value;
    return (
      currentInput.username === this.mockedUser.username &&
      currentInput.password === this.mockedUser.password
    );
  }

  login() {
    if (this.mockedValidateUser()) {
      this._toastr.success('Login Successfully!');
      // emit the user info
      this._bsModalRef.onHide?.emit(this.mockedUser);
      this._bsModalRef.hide();
    } else {
      this._toastr.error(
        'Please double check the username and password',
        'Login Failed!'
      );
    }
  }
}
