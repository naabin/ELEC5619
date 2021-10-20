import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user-services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  loading = false;

  constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private userService: UserService, private router: Router) {

   }

   onSubmit() {
     if (this.loginForm.invalid) {
       return;
     }
     this.loading = true;
     const username = this.loginForm.get('username')?.value;
     const password = this.loginForm.get('password')?.value;
     this.userService.authenticateUser(username, password).subscribe({
       next: () => {
         this.loading = false;
         this.router.navigateByUrl('/profile');
       }
     })
   }



  ngOnInit(): void {
    this.userService.logout();
  }

}
