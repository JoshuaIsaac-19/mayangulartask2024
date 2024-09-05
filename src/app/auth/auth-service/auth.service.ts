import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:5002/';
  public currentUserName="";
  public userId= 1;

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

  createUser(signupDetails:any): Observable<any>{
    const userDetails = {
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      email: signupDetails.emailAddress,
      password: signupDetails.password
    }
    console.log("createUser called");
    return this.httpClient.post((this.apiUrl+"signup"), userDetails) as any;
  };

  loginUser(loginDetails:any){
    console.log("loginDetails", loginDetails);
    const userDetails={
      email:loginDetails.email,
      password:loginDetails.password
    };
    console.log("userDetails", userDetails);
    return this.httpClient.post((this.apiUrl+"login"), userDetails) as any;
  };

  authenticator(){
    console.log("accessToken", localStorage.getItem("accessToken"));
    return this.httpClient.post((this.apiUrl+"auth"), {accessToken: localStorage.getItem("accessToken")}).subscribe((authRes:any)=>{
      console.log({user: authRes.user.userName});
      this.currentUserName=authRes.user.userName;
      if(!authRes.status || !authRes.success){
        (this._router).navigate(['login']);
      }
    })
  }

  logout(){
    console.log("Logout Called");
    return this.httpClient.post((this.apiUrl+"logout"), {accessToken: localStorage.getItem("accessToken")});

  }
}
