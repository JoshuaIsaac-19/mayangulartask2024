import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit{
  
  constructor(private authService: AuthService, private _router: Router){}

  testGlobalData:any;

  ngOnInit(): void {
    this.authService.authenticator();
  }

  addSimpleData(){
    
  }
  
}
