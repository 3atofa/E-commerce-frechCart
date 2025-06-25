import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
   step: number = 1;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  userEmail: string = '';

  resetForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codeForm = this.fb.group({
      code: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { passwordMismatch: true } 
      : null;
  };

  onSubmit() {
    if (this.resetForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.userEmail = this.resetForm.value.email;

    this.authService.setEmailVerify({ email: this.userEmail }).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Verification code sent to your email';
        this.step = 2;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to send verification code. Please try again.';
      }
    });
  }

  onVerifyCode() {
    if (this.codeForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      email: this.userEmail,
      resetCode: this.codeForm.value.code
    };

    this.authService.setCodeVerify(data).subscribe({
      next: (response:any) => {
        this.isLoading = false;
        this.successMessage = 'Code verified successfully';
        this.step = 3;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Invalid verification code. Please try again.';
      }
    });
  }

  onResetPassword() {
    if (this.passwordForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      email: this.userEmail,
      newPassword: this.passwordForm.value.newPassword
    };

    this.authService.setResetPass(data).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Password reset successfully. You can now login with your new password.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
      }
    });
  }
}
