import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../services/task/task.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private taskService: TaskService) { }

  ngOnInit() {
    console.log('mat_dialog_data', this.data);
  }
  async softDeleteTask(){
    await this.taskService.deleteTask(this.data).subscribe(async (res:any)=>{
      console.log("res",res);
      if(res && res.success){
        await this.taskService.getAllTasks().subscribe((res:any)=>{
          console.log("res",res);
          console.log("res.success",res.success);
          console.log("res.details.count",res.details.count);
          console.log("res.details.rows",res.details.rows);
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
