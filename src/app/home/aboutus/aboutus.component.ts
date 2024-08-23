import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { TaskService } from 'src/app/common/services/task/task.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit{
  
  constructor(private taskService: TaskService, private authService: AuthService, private _router: Router){}

  testGlobalData:any;

  ngOnInit(): void {
    this.authService.authenticator().subscribe((authRes:any)=>{
      console.log("authRes",authRes);
      console.log("authRes.status", authRes.status);
      console.log("authRes.success", authRes.success);
      if(!authRes.status || !authRes.success){
        (this._router).navigate(['login']);
      }
    });
  }

  addSimpleData(){
    
  }
  
}
