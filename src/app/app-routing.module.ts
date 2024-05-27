import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ContentComponent } from './home/content/content.component';
import { AddTaskComponent } from './home/add-task/add-task.component';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { TableComponent } from './home/table/table.component';

const routes: Routes = [
  {
    path: 'app', component: NavbarComponent, children: [
      {
        path: 'home', component:TableComponent ,children: [
          { path: '', component: AddTaskComponent},
        ]
      },
      { path: 'settings', component: SettingsComponent },
      { path: 'aboutus', component: AboutusComponent }
    ]
  },
  
  {path:'**', redirectTo:'app/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
