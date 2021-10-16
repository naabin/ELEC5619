import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { UserService } from "../services/user-services/user-service.service";

@Injectable({providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private userService: UserService) {

  }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
      const {value} = control;
      return this.userService.usernameExists(value).pipe(
        map((res) => {
          if (res.available){
            return null;
          }
          return null;
        }),
        catchError((err) => {
          if (err) {
            return of({nonUnique: true});
          } else {
            return of({noConnection: true});
          }
        })
      )
  }

}
