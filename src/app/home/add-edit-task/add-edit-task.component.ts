import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/common/services/task/task.service';
import { AddTaskResponse, GetAllTasks } from '../modals/common.home';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private taskService: TaskService) { }

  @ViewChild('editTask', { static: true }) editTask!: TemplateRef<any>;

  addEditForm!: FormGroup;

  ngOnInit() {
    console.log("add-edit-task component ts NgOnit called");
    // console.log("this.data in add-edit-task: ", this.data);
    this.addEditForm = new FormGroup({
      taskName: new FormControl(this.data.txt_taskName || ''),
      description: new FormControl(this.data.txt_description || ''),
      status: new FormControl(this.data.txt_status || ''),
      priority: new FormControl(this.data.txt_priority || ''),
      dueDate: new FormControl(this.data.date_dueDate || '')
    });
  }

  ngOnDestroy(){
    console.log("this.addEditForm", this.addEditForm.value);
    console.log("Yep, OnDestroy called on Add-Edit-Task Component");
  }
  upsertTaskDetails() {
    // console.log("this.addEditForm", this.addEditForm.value.taskName);
    // this.taskService.upsertTask(newTaskDate).subscribe((data: AddTaskResponse) => {
    //   if (data && data.success && data.details.id) {
    //     console.log(data);
    //     this.taskService.getAllTasks().subscribe((data: GetAllTasks) => {
    //       console.log('before data', data);
    //       if (data && data.success && data.details.count && data.details.rows) {
    //         console.log('success')
    //         this.taskService.notifyTaskAdded();
    //         this.getAllTaskData = data.details.rows;
    //         console.log('this.getAllTaskData', this.getAllTaskData);
    //       }
    //     })
    //   }
    // })
  }
  upsertTaskDetails1(){
    // console.log(this.addEd)
  }

}
