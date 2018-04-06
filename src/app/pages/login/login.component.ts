import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common-services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CommonService]
})
export class LoginComponent implements OnInit {

  constructor(
    private api: CommonService
  ) { }

  public loginForm: any = {
    email : '',
    password : '',
  };

  public login() {
      console.log(this.loginForm);
  }

  ngOnInit() {
  }

}
