import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { GetAllTasks, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DialogBoxComponent } from 'src/app/common/dialog-box/dialog-box.component';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {

  getAllTaskData!: RawTaskStructure[];
  private taskAddedSubscription!: Subscription;
  exists: boolean = false;

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllTasksData();
    this.loadTasksData();
  }
  ngOnDestroy(): void {
    if (this.taskAddedSubscription) {
      this.taskAddedSubscription.unsubscribe();
    }
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
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        console.log("Just to check", taskList);
      }
    })
  }

  deleteTask() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    })
  }

}
