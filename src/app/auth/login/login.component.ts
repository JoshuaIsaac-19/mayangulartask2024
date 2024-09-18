import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private _router:Router) { }
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

  

  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe((res:any)=>{
      console.log("res", res);
      if(res.success){
        if((res.firstName || res.lastName) && res.userId){
          localStorage.setItem("userId", res.userId);
          localStorage.setItem("userName", res.firstName+" "+res.lastName);
          console.log(localStorage.getItem("userName"));
          localStorage.setItem("accessToken", res.accessToken);
          (this._router).navigate(['app/home']);
        }
      }
      else{
        console.log("Something went wrong while loging in!");
        (this._router).navigate(['login']);
      }
    })
  }
}
