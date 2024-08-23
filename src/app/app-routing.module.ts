import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ContentComponent } from './home/content/content.component';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path: 'app', component: NavbarComponent, children: [
      {
        path: 'home', children: [
          { path: '', component:ContentComponent},
        ]
      },
      { path: 'settings', component: SettingsComponent },
      { path: 'aboutus', component: AboutusComponent }
    ]
  },
  {path:'**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
