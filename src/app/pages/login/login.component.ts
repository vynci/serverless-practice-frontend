import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common-services/common.service';
import { Router } from '@angular/router';
import { UserRegistrationService } from '../../providers/auth/register.service';
import { UserLoginService } from '../../providers/auth/login.service';
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from '../../providers/common-services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CommonService, UserRegistrationService, UserLoginService]
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {

  constructor(
    private api: CommonService,
    private userRegistration: UserRegistrationService,
    private userLogin: UserLoginService,
    private router: Router
  ) { }

  public showConfirmCard = false;

  public loginForm: any = {
    email : '',
    password : '',
  };

  public confirmationCode: any;
  public errorMessage: any;

  public onLogin() {
    this.userLogin.authenticate(this.loginForm.email, this.loginForm.password, this);
  }

  public onConfirmRegistration() {
      this.userRegistration.confirmRegistration(this.loginForm.email, this.confirmationCode, this);
  }

  public onRegister() {
    this.userRegistration.register({
      name: this.loginForm.email,
      email : this.loginForm.email,
      phone_number: '+639065660740',
      password : this.loginForm.password
    }, this);
  }

  cognitoCallback(message: string, result: any) {
    console.log(message);
    console.log(result);
    this.errorMessage = message;

    if (message != null) {
      if (message === 'User is not confirmed.') {
        console.log('hey');
        this.showConfirmCard = true;
      }
    } else {
      this.router.navigate(['/account']);
    }
  }

  isLoggedIn(message: string, loggedIn: boolean) {
    console.log(loggedIn);
    if (loggedIn) {
      this.router.navigate(['/account']);
    }
  }

  ngOnInit() {
    this.userLogin.isAuthenticated(this);
  }

}
