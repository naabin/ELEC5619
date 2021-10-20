import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { UserService } from "../services/user-services/user-service.service";
import { catchError, map } from 'rxjs/operators'
import { Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class UniqEmailValidator implements AsyncValidator {
  constructor(private userService: UserService){}
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const {value} = control;
    return this.userService.emailExists(value).pipe(
      map((res) => {
        if (res.available) {
          return null;
        }
        return null;
      }),
      catchError((err) => {
        if (err) {
          return of({emailExists: true});
        } else {
          return of({noConnection: true});
        }
      })
    )
  }
}
