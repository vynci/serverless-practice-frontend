import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common-services/common.service';
import { ChallengeParameters, CognitoCallback, LoggedInCallback, Callback } from '../../providers/common-services/cognito.service';
import { UserLoginService } from '../../providers/auth/login.service';
import { UserParametersService } from '../../providers/auth/parameters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [CommonService, UserLoginService, UserParametersService]
})
export class AccountComponent implements LoggedInCallback, Callback, OnInit {

  constructor(
    private api: CommonService,
    private userLogin: UserLoginService,
    private userParameters: UserParametersService,
    private router: Router
  ) { }

  private currentUser: string;

  public pets: any = [];
  public petForm: any = {
    name : '',
    type : '',
    breed : '',
    owner : this.currentUser,
    description : ''
  };

  public isSubmitting = false;
  public isShowPetForm = false;
  public isLoading = false;

  private showErrorMessage() {
    alert('sorry, something went wrong');
  }

  public showPetForm() {
    this.isShowPetForm = true;
  }

  public hidePetForm() {
    this.isShowPetForm = false;
  }

  private clearPetForm() {
    this.petForm = {
      name : '',
      type : '',
      breed : '',
      owner : this.currentUser,
      description : ''
    };
  }

  private getPets() {
    this.isLoading = true;

    this.api.get('pets')
    .then(result => {
      this.isLoading = false;
      this.pets = result;
    });
  }

  public deletePet(pet: any) {
    this.api.delete('pets', pet.id)
    .then(result => {
      console.log(result);
      this.getPets();
    }, err => {
      this.showErrorMessage();
    });
  }

  public submitPet() {
    this.isSubmitting = true;
    this.api.create('pets', this.petForm)
    .then(result => {
      this.getPets();
      this.clearPetForm();
      this.isSubmitting = false;
    }, err => {
      this.clearPetForm();
      this.isSubmitting = false;
      this.showErrorMessage();
    });
  }

  callbackWithParam(result: any) {
    this.currentUser = result[5].Value;
    this.clearPetForm();
    this.getPets();
  }

  callback() {}

  isLoggedIn(message: string, loggedIn: boolean) {
    if (loggedIn) {
      this.userParameters.getParameters(this);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.userLogin.isAuthenticated(this);
  }

}
