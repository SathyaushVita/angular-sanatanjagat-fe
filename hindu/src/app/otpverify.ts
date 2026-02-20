import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function otpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otp = control.value;
    const isValid = /^\d{6}$/.test(otp); // Checks if the OTP is exactly 6 digits
    return isValid ? null : { invalidOtp: true };
  };
}
