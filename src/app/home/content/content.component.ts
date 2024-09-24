import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { EventValue, GetAllTasks, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {

  getAllTaskData!: RawTaskStructure[];
  globalTaskData!: RawTaskStructure[];
  tasksData!:RawTaskStructure[];
  private taskAddedSubscription!: Subscription;

  title='Title';
  filterArray=[
    {label: 'All', value: 'all'},
    {label: 'High', value: 'high'}, 
    {label: 'Medium', value: 'medium'}, 
    {label: 'Low', value: 'low'}
  ]
  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // console.log("Called Content OnInit");
    this.authService.authenticator();
    // this.taskService.notifyTaskAdded();
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

  async loadTasksData() {
      await this.taskService.getAllTasks().subscribe((data: GetAllTasks) => {
        if(data && data.success){
          // if(data.details.count && data.details.rows){
            this.globalTaskData = data.details.rows;
            this.getAllTaskData = data.details.rows;
          // }
          if(data.details.count){
            console.log("No data available");
          }
        }
        else{
          console.log("Failed to load tasks data");
        }
      })
  }

  async onEmit(event:EventValue){
      if((event.value=='low' || event.value=='Low') && this.getAllTaskData){
        this.getAllTaskData=this.globalTaskData.filter((item:any)=>item.txt_priority=='Low');
        // console.log("onEmit Low ", this.getAllTaskData);
      }
      else if((event.value=='high' || event.value=='High') && this.getAllTaskData){
        this.getAllTaskData= this.globalTaskData.filter((item:any)=>item.txt_priority=='High');
        // console.log("onEmit High ", this.getAllTaskData);
      }
      else if((event.value=='medium' || event.value=='Medium') && this.getAllTaskData){
        this.getAllTaskData= this.globalTaskData.filter((item:any)=>item.txt_priority=='Medium');
        // console.log("onEmit medium ", this.getAllTaskData);
      }
      else{
        this.loadTasksData();
        this.getAllTaskData = this.globalTaskData;
      }
  }

  addEditDelTask(taskList:any) {
    this.dialog.open(AddEditTaskComponent, {
      width: '400px',
      data: taskList
    }).afterClosed().subscribe((res)=>{
      if(res){
        this.loadTasksData();
      }
    })
  }
}
