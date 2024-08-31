import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private _router:Router, 
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  newTaskForm!: FormGroup;
  @ViewChild('addTask', {static:true}) addaNewTask!:TemplateRef<any>;

    user:string= "Joshua";
    currentUrl: string[] =[];
    currentRoute: string="";
    urlArrayLength: number=0;

    isHomeActive:boolean=false;
    isAboutActive: boolean= false;
    isSettingsActive: boolean= false;

    menuHome: string= "Home";
    menuAboutUs: string= "About us";
    menuSettings: string= "Settings";

    ngOnInit() {
      this.currentUrl = (this._router.url).split('/');
      this.urlArrayLength= this.currentUrl.length;
      // console.log('Current URL:', this.currentUrl[this.urlArrayLength-1]);
    
      if(this.currentUrl[this.urlArrayLength-1]=="home"){
        this.isHomeActive=true;
      }
      if(this.currentUrl[this.urlArrayLength-1]=="settings"){
        this.isSettingsActive= true;
      }
      if(this.currentUrl[this.urlArrayLength-1]=="aboutus"){
        this.isAboutActive= true;
      }
      this.newTaskForm = this.fb.group({
        taskName: [''],
        status: [''],
        dueDate: ['']
      });
    }
    
    logoutUser(){
      this.authService.logout();
      (this._router).navigate(['/login']);
    }

   toggleActive(str:any){
    if(str=='Home'){
      if(!this.isHomeActive){
        this.isHomeActive=!this.isHomeActive;
        this.isAboutActive= false;
        this.isSettingsActive=false;
      }
    }
    if(str=='About us'){
      if(!this.isAboutActive){
        this.isAboutActive= !this.isAboutActive;
        this.isHomeActive=false;
        this.isSettingsActive=false;
      }
    }
    if(str=='Settings'){
      if(!this.isSettingsActive){
        this.isSettingsActive =!this.isSettingsActive;
        this.isAboutActive= false;
        this.isHomeActive= false;
      }
    }
   }

  navigateToHome(str:any){
    this.toggleActive(str);
    if(this.isHomeActive){
      (<any>this._router).navigate(['app/home'])
    }
  }
  navigateToSettings(str:any){
    this.toggleActive(str);
    if(this.isSettingsActive){
      (<any>this._router).navigate(['app/settings'])
    }
  }
  navigateToAboutUs(str:any){
    this.toggleActive(str);
    if(this.isAboutActive){
      (<any>this._router).navigate(['app/aboutus'])
    }
  }

}