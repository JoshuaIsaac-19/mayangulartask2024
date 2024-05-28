import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavbarComponent } from './common/navbar/navbar.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { AddTaskComponent } from './home/add-task/add-task.component';
import { ContentComponent } from './home/content/content.component';
import { MaterialModule } from './material-module/material.module';
import { NavbarModule } from './common/navbar/navbar-module/navbar/navbar.module';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { TableComponent } from './home/table/table.component';
import { PageListComponent } from './home/page-list/page-list.component';

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    DialogBoxComponent,
    AddTaskComponent,
    ContentComponent,
    SettingsComponent,
    AboutusComponent,
    TableComponent,
    PageListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
