import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar.component';
import { MaterialModule } from 'src/app/material-module/material.module';
import { RouterModule } from '@angular/router';
// import {MatToolbarModule} from '@angular/material/toolbar';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    // MatToolbarModule 
    MaterialModule,
    RouterModule
  ]
})
export class NavbarModule { }
