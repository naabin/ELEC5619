import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Injectable({providedIn: 'root'})
export class PasswordMatchValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const {password, confirmPassword} = control.value;
    if (password === confirmPassword) {
      return null;
    }
    return {noMatch: true};
  }
}
