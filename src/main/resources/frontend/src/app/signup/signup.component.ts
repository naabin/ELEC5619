import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../entities/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: User = new User();
  constructor(public bsModalRef: BsModalRef){}

  ngOnInit(): void {
    const {name, email, address, password, username} = this.user;
    this.signUpForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      email: new FormControl(email, [Validators.required]),
      address: new FormControl(address, [Validators.required]),
      password: new FormControl(password, [Validators.required]),
      username: new FormControl(username, [Validators.required])
    })
  }

}
