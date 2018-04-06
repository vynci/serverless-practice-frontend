import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'account', loadChildren: './account/account.module#AccountModule' },
            { path: 'login', loadChildren: './login/login.module#LoginModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule {}
