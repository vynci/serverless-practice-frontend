import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { HeaderComponent } from '../components/header/header.component';
import { PetCardComponent } from '../components/petcard/petcard.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    PagesComponent,
    HeaderComponent,
    PetCardComponent
  ]
})
export class PagesModule { }
