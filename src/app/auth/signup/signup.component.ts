import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailAddress: new FormControl(''),
    password: new FormControl('')
  })
  
  constructor(private authService: AuthService, private _router: Router) {}

  onSubmit() {
    console.log("signupForm", this.signupForm.value);
    this.authService.createUser(this.signupForm?.value).subscribe((data:any)=>{
      console.log("data", data);
    });
    (this._router).navigate(['login']);
  }
}
