import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { ContentComponent } from './home/content/content.component';
import { MaterialModule } from './material-module/material.module';
import { NavbarModule } from './common/navbar/navbar-module/navbar/navbar.module';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { TableComponent } from './home/table/table.component';
import { PageListComponent } from './home/page-list/page-list.component';
import { HttpClientModule } from '@angular/common/http';
import { HighlightPipe } from './common/highlight.pipe';
import { AddEditTaskComponent } from './home/add-edit-task/add-edit-task.component';
import { TaskFilterComponent } from './home/task-filter/task-filter.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    ContentComponent,
    SettingsComponent,
    AboutusComponent,
    TableComponent,
    PageListComponent,
    HighlightPipe,
    AddEditTaskComponent,
    TaskFilterComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NavbarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
