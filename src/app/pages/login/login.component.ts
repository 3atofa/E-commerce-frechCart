import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  

  isLoading:boolean = false;
  msError:string = '';
  isSuccess:string = '';

  

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
  },);

  submitForm():void
  {
    if(this.login.valid)
    {
      this.isLoading =true;
      
      // * Login Starts
      this.authService.sendLoginForm(this.login.value).subscribe({  
        next:(res) => {
          console.log(res);
          if(res.message === 'success'){
            
            setTimeout(() => {
              // ^ save token
              localStorage.setItem('userToken', res.token);
              
              // ~ decode token
              this.authService.saveUserData();
              
              // * navigate to home
              this.router.navigate(['/home', ])
              

            }, 500);

            this.isSuccess = res.message;
          } 
          this.isLoading = false;
        },

        error:(err:HttpErrorResponse) => {
          console.log(err);
          this.isLoading = false;
          this.msError = err.error.message;
        }

      })
    }
    
  }

}
