import { Component, DoCheck, Output, EventEmitter } from '@angular/core';
import { UserLoginService } from '../../providers/auth/login.service';
import { ChallengeParameters, CognitoCallback, LoggedInCallback } from '../../providers/common-services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserLoginService]
})
export class HeaderComponent implements LoggedInCallback, DoCheck {
  constructor(
    private userLogin: UserLoginService
  ) { }

  public loggedIn = false;

  public toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('push-right');
  }

  public logout() {
    this.userLogin.logout();
  }

  isLoggedIn(message: string, loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }

  ngDoCheck()	{
    this.userLogin.isAuthenticated(this);
  }
}
