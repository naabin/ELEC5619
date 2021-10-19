import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup;

  constructor(
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

  hideModal() {
    this._bsModalRef.hide();
  }

  register() {
    if (this.signUpForm.valid) {
      this._toastr.success('Register Successfully!');
      // emit the user info
      this._bsModalRef.onHide?.emit(this.signUpForm.value);
      this._bsModalRef.hide();
    }
  }
}
