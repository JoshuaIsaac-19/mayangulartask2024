import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private _router:Router, private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    console.log("Oninit called");
    console.log("localStorage ",localStorage.getItem("accessToken"));
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    console.log("localStorage.getItem ", localStorage.getItem("userId"));
    console.log("localStorage.getItem ", localStorage.getItem("userName"));
    console.log("localStorage.getItem ", localStorage.getItem("accessToken"));
  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe((res:any)=>{
      console.log("res", res);
      if(res.success){
        if(res.error=="Invalid Account"){
          this.openSnackBar("Invalid Account", "Okay");
        }
  
        else if(res.error=="Incorrect Password"){
          this.openSnackBar("Incorrect Password", "Okay");
        }
        if((res.firstName || res.lastName) && res.userId){
          localStorage.setItem("userId", res.userId);
          localStorage.setItem("userName", res.firstName+" "+res.lastName);
          console.log(localStorage.getItem("userName"));
          localStorage.setItem("accessToken", res.accessToken);
          (this._router).navigate(['app/home']);
        }
      }
      
      else{
        this.openSnackBar("Something went wrong, try again!","Okay");
        console.log("Something went wrong while loging in!");
        (this._router).navigate(['login']);
      }
    })
  }
}
