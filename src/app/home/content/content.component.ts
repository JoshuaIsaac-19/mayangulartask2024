import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { AddTaskResponse, GetAllTasks, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DialogBoxComponent } from 'src/app/common/dialog-box/dialog-box.component';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {

  getAllTaskData!: RawTaskStructure[];
  private taskAddedSubscription!: Subscription;
  // addEditForm!: FormGroup;
  exists: boolean = false;

  constructor(
    private taskService: TaskService, 
    private dialog: MatDialog, 
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.addEditForm = new FormGroup({
    //   taskName: new FormControl(''),
    //   description: new FormControl(''),
    //   status: new FormControl(''),
    //   priority: new FormControl(''),
    //   dueDate: new FormControl('')
    // });
    this.getAllTasksData();
    this.loadTasksData();
  }
  ngOnDestroy(): void {
    if (this.taskAddedSubscription) {
      this.taskAddedSubscription.unsubscribe();
    }
  }

  formatDate(dueDate: Date) {
    const d = new Date(dueDate);
    let month = '' + (d.getMonth() + 1);
    let date = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (date.length < 2) date = '0' + date;

    return [year, month, date].join('/');
  }

  getAllTasksData() {
    this.taskService.getAllTasks().subscribe((data: GetAllTasks) => {
      console.log('before data', data);
      if (data && data.success && data.details.count && data.details.rows) {
        console.log('success')
        this.exists = true;
        this.getAllTaskData = data.details.rows;
        console.log('this.getAllTaskData', this.getAllTaskData);
      }
      else {
        this.exists = false;
      }
    })
  }

  loadTasksData() {
    this.taskAddedSubscription = this.taskService.taskAdded$.subscribe(() => {
      this.taskService.getAllTasks().subscribe((data: GetAllTasks) => {
        console.log('before data', data);
        if (data && data.success && data.details.count && data.details.rows) {
          console.log('success')
          this.exists = true;
          this.getAllTaskData = data.details.rows;
          console.log('this.getAllTaskData', this.getAllTaskData);
        }
      })
    });
  }

  editTask(taskList: any) {
    this.dialog.open(AddEditTaskComponent, {
      width: '400px',
      data: taskList
    });
  }

  deleteTask() {
    this.dialog.open(DialogBoxComponent, {
      width: '400px',
    });
  }
  
  addNewTask() {
    this.dialog.open(AddEditTaskComponent,{
      width: '400px',
    })
  }

}
