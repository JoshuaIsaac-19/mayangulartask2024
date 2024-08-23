import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private _router:Router){}
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe((res:any)=>{
      console.log("res", res);
      if(res.success){
        localStorage.setItem("accessToken", res.accessToken);
        (this._router).navigate(['app/home']);
      }
      else{
        (this._router).navigate(['login']);
      }
    })
  }
}
