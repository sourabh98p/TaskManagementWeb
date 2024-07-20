import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from 'src/app/models/user-response';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string = '';
  loginForm!: FormGroup;
  
  public LoginResquestModel: LoginRequest = new LoginRequest();
  public LoginResponseModel : LoginResponse = new LoginResponse();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private commonService :  CommonService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
  this.loginError = '';
  if(this.loginForm.valid){
    this.commonService.showLoader();
    this.LoginResquestModel = this.loginForm.value;
    this.authService.login(this.LoginResquestModel).subscribe({
      next : (response) => {
          this.commonService.hideLoader();
          if(response.isSuccess){ 
            this.LoginResponseModel = response.data;
            this.commonService.setUserDetails(this.LoginResponseModel.userDetails);
            this.commonService.setTokenDetails(this.LoginResponseModel.tokenDetails);
            let role = this.LoginResponseModel.userDetails.role;
            this.commonService.setRole(role);
            this.commonService.setUserId(this.LoginResponseModel.userDetails.UserId);
            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else if (role === 'manager') {
              this.router.navigate(['/manager']);
            } else {
              this.router.navigate(['/employee']);
            }
          }
          else { 
            this.loginError = 'Invalid email or password. Please try again.';
          }
      },
      error : (error) => {
          this.commonService.hideLoader();
          this.loginError = 'An error occurred. Please try again later.';
          throw error;
      }
   });
  } else{
    this.loginForm.markAllAsTouched();
  }
}

  

}
