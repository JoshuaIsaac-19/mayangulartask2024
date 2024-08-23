import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../services/task/task.service';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private taskService: TaskService, 
    private authService: AuthService, 
    private _router: Router

  ) { }

  ngOnInit() {
    this.authService.authenticator().subscribe((authRes:any)=>{
      if(!authRes.status || !authRes.success){
        (this._router).navigate(['login']);
      }
    });
  }
  
  async softDeleteTask(){
    await this.taskService.deleteTask(this.data).subscribe(async (res:any)=>{
      console.log("res",res);
      if(res && res.success){
        await this.taskService.getAllTasks().subscribe((res:any)=>{
          if(res.success && res.details.count && res.details.rows){
            this.taskService.notifyTaskAdded();
          }
          else{
            console.log("Failed to get task data");
          }
        })
      }
      else{
        console.log("Failed to delete task data");
      }
    })
  }
}
