import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { TaskService } from 'src/app/common/services/task/task.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private taskService: TaskService, private authService: AuthService, private _router: Router) { }

  @ViewChild('editTask', { static: true }) editTask!: TemplateRef<any>;

  addEditForm!: FormGroup;

  ngOnInit() {
    this.authService.authenticator().subscribe((authRes:any)=>{
      console.log("authRes",authRes);
      console.log("authRes.status", authRes.status);
      console.log("authRes.success", authRes.success);
      if(!authRes.status || !authRes.success){
        (this._router).navigate(['login']);
      }
    });
    this.addEditForm = new FormGroup({
      taskName: new FormControl(this.data?.txt_taskName || ''),
      description: new FormControl(this.data?.txt_description || ''),
      status: new FormControl(this.data?.txt_status || ''),
      priority: new FormControl(this.data?.txt_priority || ''),
      dueDate: new FormControl(this.data?.date_dueDate || '')
    });
  }

  ngOnDestroy(){

  };

  formatDate(dueDate: Date) {
    const d = new Date(dueDate);
    let month = '' + (d.getMonth() + 1);
    let date = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (date.length < 2) date = '0' + date;

    return [year, month, date].join('/');
  }
  
  async upsertTaskDetails() {
    const editNewTask={
      id: this.data?.id ?? null,
      userId: 1, //will update once the accounts are implemented
      txt_taskName: this.addEditForm.value.taskName,
      txt_description: this.addEditForm.value.description,
      txt_status: this.addEditForm.value.status,
      txt_priority: this.addEditForm.value.priority,
      date_dueDate: this.formatDate(this.addEditForm.value.dueDate)
    };
    console.log("editNewTask", editNewTask);
    await this.taskService.upsertTask(editNewTask).subscribe(async (data: any)=>{
      console.log("upsert data", data);
      if(data && data.success){
       await this.taskService.getAllTasks().subscribe((data: any)=>{
          if(data.success && data.details.count && data.details.rows){
            console.log("upsert getUpdateData success");
            this.taskService.notifyTaskAdded();
          }
          else{
            console.log("Failed to get UpdatedData");
          };
        })
      }
      else{
        console.log("Failed to update data");
      };
    })
  }

}
