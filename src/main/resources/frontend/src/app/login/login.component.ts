import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {AuthHttpService} from "../http/auth.http.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private readonly _fb: FormBuilder,
        private readonly _bsModalRef: BsModalRef,
        private readonly _toastr: ToastrService,
        private readonly _authHttpService: AuthHttpService
    ) {
        this.loginForm = _fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
    }

    hideModal() {
        this._bsModalRef.hide();
    }

    login() {
        this._authHttpService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((res) => {
            this._toastr.success('Login Successfully!');
            // emit the user info
            this._bsModalRef.onHide?.emit(res);
            this._bsModalRef.hide();
        }, () => {
            this._toastr.error(
                'Please double check the username and password',
                'Login Failed!'
            );
        });
    }
}
