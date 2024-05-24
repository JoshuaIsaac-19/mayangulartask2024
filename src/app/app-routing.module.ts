import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ContentComponent } from './home/content/content.component';
import { AddTaskComponent } from './home/add-task/add-task.component';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';

const routes: Routes = [
  {path:'', redirectTo:'/app/home', pathMatch:'full'},
  {
    path:'app', component:NavbarComponent, children: [
      {
         path:'home', component:ContentComponent ,children: [
        {path:'', component:ContentComponent,pathMatch:'full'},
        {path:'addtask', component:AddTaskComponent },
      ] 
    },
      {path:'settings', component: SettingsComponent},
      {path:'aboutus', component:AboutusComponent}
    ]
  },
  // {path:'**', redirectTo:'app', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
