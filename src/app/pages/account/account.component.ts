import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../providers/common-services/common.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [CommonService]
})
export class AccountComponent implements OnInit {

  constructor(
    private api: CommonService
  ) { }

  public pets: any;
  public petForm: any = {
    name : '',
    type : '',
    breed : '',
    owner : 'default',
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
      owner : 'default',
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

  ngOnInit() {
    this.getPets();
  }

}
