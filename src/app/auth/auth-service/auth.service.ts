import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:5002/';

  constructor(private httpClient: HttpClient) { }

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
    const accessToken= localStorage.getItem("accessToken");
    console.log("accessToken", accessToken);
    return this.httpClient.post((this.apiUrl+"auth"), {accessToken:accessToken}) as any;
  }
}
