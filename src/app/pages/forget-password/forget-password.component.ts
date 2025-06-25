import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

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

  resetForm!: FormGroup;
  codeForm!: FormGroup;
  passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.initializeForms();
  }

  private initializeForms(): void {
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

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.markFormGroupTouched(this.resetForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.userEmail = this.resetForm.value.email;

    this.authService.setEmailVerify({ email: this.userEmail }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = this.translate.instant('passwordReset.codeSentSuccess');
        this.step = 2;
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(error, 'errorMessages.sendCodeFailed');
      }
    });
  }

  onVerifyCode(): void {
    if (this.codeForm.invalid) {
      this.markFormGroupTouched(this.codeForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      email: this.userEmail,
      resetCode: this.codeForm.value.code
    };

    this.authService.setCodeVerify(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = this.translate.instant('passwordReset.codeVerifiedSuccess');
        this.step = 3;
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(error, 'errorMessages.invalidCode');
      }
    });
  }

  onResetPassword(): void {
    if (this.passwordForm.invalid) {
      this.markFormGroupTouched(this.passwordForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      email: this.userEmail,
      newPassword: this.passwordForm.value.newPassword
    };

    this.authService.setResetPass(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = this.translate.instant('passwordReset.passwordResetSuccess');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(error, 'errorMessages.resetFailed');
      }
    });
  }

  private handleError(error: any, defaultTranslationKey: string): void {
    if (error.error?.message) {
      this.errorMessage = error.error.message;
    } else {
      this.errorMessage = this.translate.instant(defaultTranslationKey);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}