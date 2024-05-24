import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private _router:Router, private openDialog: MatDialog,   private fb: FormBuilder){}
  newTaskForm!: FormGroup;
  @ViewChild('addTask', {static:true}) addaNewTask!:TemplateRef<any>;

  isHomeActive:boolean=false;
    isAboutActive: boolean= false;
    isSettingsActive: boolean= false;
    menuHome: string= "Home";
    menuAboutUs: string= "About us"
    menuSettings: string= "Settings"  

    ngOnInit() {
      this.isHomeActive = true;
      this._router.navigate(['app/home']);
      this.newTaskForm = this.fb.group({
        taskName: [''],
        status: [''],
        dueDate: ['']
      });
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

  // taskStatus: string="";
  // dueDate:Date=new Date();
  // newTaskForm = new FormGroup({
  //   taskName: new FormControl('')
  //   // dueDate: new FormControl('')
  // })
  addNewTask(){

    console.log("AddTask Button Clicked");
    const dialogRef=this.openDialog.open(this.addaNewTask, {
      autoFocus:false,
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(response =>{
      if(response){
        console.log(this.newTaskForm.value)
        // console.log(this.newTaskForm.value.taskName);
        // console.log(this.taskStatus);
        // console.log(this.dueDate)
        this.newTaskForm.reset()
      }
      console.log('response: ', response)
    })
  }
}