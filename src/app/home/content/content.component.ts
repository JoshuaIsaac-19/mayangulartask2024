import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { EventValue, GetAllTasks, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/common/dialog-box/dialog-box.component';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';

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
  exists: boolean = false;

  title='Title';
  filterArray=[
    {label: 'All', value: 'all'},
    {label: 'High', value: 'high'}, 
    {label: 'Medium', value: 'medium'}, 
    {label: 'Low', value: 'low'}
  ]
  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    

    this.taskService.notifyTaskAdded();
    this.getAllTasksData();
    // console.log("this.loadTasksData()", this.loadTasksData());
    // console.log("this.taskService.loadTasksData()", this.taskService.loadTasksData());
    // this.getAllTaskData= this.taskService.loadTasksData();
    // this.taskAddedSubscription = this.taskService.taskAdded$.subscribe((updatedTasks: RawTaskStructure[]) => {
    //   this.globalTaskData = updatedTasks;
    //   this.getAllTaskData = updatedTasks;
    // });

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
        console.log('getAllTasksData success');
        this.exists = true;
        this.getAllTaskData = data.details.rows;
        this.globalTaskData = data.details.rows;
      }
      else {
        this.exists = false;
      }
    })
  }

  async loadTasksData() {
    // this.taskAddedSubscription = this.taskService.taskAdded$.subscribe(() => {
      await this.taskService.getAllTasks().subscribe((data: GetAllTasks) => {
        if (data && data.success && data.details.count && data.details.rows) {
          console.log('loadTasksData success');
          this.exists = true;
          this.globalTaskData = data.details.rows;
          this.getAllTaskData = data.details.rows;
        }
        else{
          console.log("Failed to load task data");
        }
      })
    // });
  }

  async onEmit(event:EventValue){
    // this.taskAddedSubscription= this.taskService.taskAdded$.subscribe(()=>{
      if((event.value=='low' || event.value=='Low') && this.exists){
        // this.loadTasksData();
        
        this.getAllTaskData=this.globalTaskData.filter((item:any)=>item.txt_priority=='Low');
        this.taskService.notifyTaskAdded();
        // this.taskAddedSubscription.unsubscribe();
      }
      else if((event.value=='high' || event.value=='High') && this.exists){
        // this.loadTasksData();
        this.getAllTaskData= this.globalTaskData.filter((item:any)=>item.txt_priority=='High');
        this.taskService.notifyTaskAdded();
        // this.taskAddedSubscription.unsubscribe();
      }
      else if((event.value=='medium' || event.value=='Medium') && this.exists){
        // this.loadTasksData();
        this.getAllTaskData= this.globalTaskData.filter((item:any)=>item.txt_priority=='Medium');
        this.taskService.notifyTaskAdded();
        // this.taskAddedSubscription.unsubscribe();
      }
      else{
        this.loadTasksData();
        this.getAllTaskData = this.globalTaskData;
      }
    // })
    
    this.taskService.notifyTaskAdded();
    // this.taskAddedSubscription.unsubscribe();
  }

  editTask(taskList: any) {
    this.dialog.open(AddEditTaskComponent, {
      width: '400px',
      data: taskList
    });
  }

  deleteTask(taskId: any) {
    this.dialog.open(DialogBoxComponent, {
      width: '400px',
      data:taskId
    });
  }

  addNewTask() {
    this.dialog.open(AddEditTaskComponent, {
      width: '400px',
    })
  }
}
