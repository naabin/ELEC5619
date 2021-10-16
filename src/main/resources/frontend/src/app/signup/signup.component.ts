import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../entities/User';
import { LoginComponent } from '../login/login.component';
import { NotificationService } from '../services/notification-service/notification.service';
import { UserService } from '../services/user-services/user-service.service';
import { PasswordMatchValidator } from './passwordmatch';
import { UniqEmailValidator } from './uniqueEmailValidator';
import { UniqueUsernameValidator } from './uniqueUserValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  user: User = new User();
  loading = false;
  constructor(public bsModalRef: BsModalRef,
              private userService: UserService,
              private router: Router,
              private modalService: BsModalService,
              private uniqueEmailCheck: UniqEmailValidator,
              private uniqueUserCheck: UniqueUsernameValidator,
              private notificationService: NotificationService,
              private passwordMatch: PasswordMatchValidator){}

  ngOnInit(): void {
    const {name, email, password, username} = this.user;
    this.signUpForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email], [this.uniqueEmailCheck.validate.bind(this.uniqueEmailCheck)]),
      password: new FormControl(password, [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      username: new FormControl(username, [Validators.required], [this.uniqueUserCheck.validate.bind(this.uniqueUserCheck)])
    }, {validators: this.passwordMatch.validate})
  }

  onSubmit() {
    console.log('signup is pressed');
    if (this.signUpForm.invalid) {
      return;
    }
    this.loading = true;
    this.user.name = this.signUpForm.get('name')?.value;
    this.user.email = this.signUpForm.get('email')?.value;
    this.user.password = this.signUpForm.get('password')?.value;
    this.user.username = this.signUpForm.get('username')?.value;

    this.userService.registerLender(this.user).subscribe({
      next: (val) => {
        console.log(val);
        this.loading = false;
        this.bsModalRef.hide();
        this.notificationService.addSuccess('Successfully signed up')
        this.modalService.show(LoginComponent);
      }
    });
  }
}
