import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { AddTaskComponent } from './home/add-task/add-task.component';
import { ContentComponent } from './home/content/content.component';
import { MaterialModule } from './material-module/material.module';
import { NavbarModule } from './common/navbar/navbar-module/navbar/navbar.module';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { TableComponent } from './home/table/table.component';
import { PageListComponent } from './home/page-list/page-list.component';
import { FormComponent } from './home/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { HighlightPipe } from './common/highlight.pipe';
import { EditTaskComponent } from './home/edit-task/edit-task.component';
import { DeleteTaskComponent } from './home/delete-task/delete-task.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    AddTaskComponent,
    ContentComponent,
    SettingsComponent,
    AboutusComponent,
    TableComponent,
    PageListComponent,
    FormComponent,
    HighlightPipe,
    EditTaskComponent,
    DeleteTaskComponent,
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
