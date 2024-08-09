import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { AddTaskResponse, EventValue, GetAllTasks, ProductList, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DialogBoxComponent } from 'src/app/common/dialog-box/dialog-box.component';
import { AddEditTaskComponent } from '../add-edit-task/add-edit-task.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {

  getAllTaskData!: RawTaskStructure[];
  tasksData!:RawTaskStructure[];
  private taskAddedSubscription!: Subscription;
  // addEditForm!: FormGroup;
  exists: boolean = false;

  title='Title';
  filterArray=[{label: 'All', value: 'all'}, {label: 'High', value: 'high'}, {label: 'Medium', value: 'medium'}, {label: 'Low', value: 'low'}]
  constructor(
    private taskService: TaskService, 
    private dialog: MatDialog, 
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    // this.getAllTasksData();
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
        console.log('getAllTasksData success')
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
        if (data && data.success && data.details.count && data.details.rows) {
          console.log('loadTasksData success');
          this.exists = true;
          this.getAllTaskData = data.details.rows;
          console.log('this.getAllTaskData', this.getAllTaskData);
        }
        else{
          console.log("Failed to load task data");
        }
      })
    });
  }

  onEmit(event:EventValue){
    if(event.value=='low' && this.tasksData){
      const lowStatusTaskFilter= this.tasksData.filter((item:any)=>item.priority=='low' )
      this.tasksData= lowStatusTaskFilter;
    }
    this.taskService.notifyTaskAdded();
  }
    // else if(event.value==='>50'){
    //   const aboveFiftyFilter= this.PRODUCTS_DATA.filter(item=> item.price>50)
    //   this.productSource= new MatTableDataSource<ProductList>(aboveFiftyFilter)
    // }
  // }

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
    this.dialog.open(AddEditTaskComponent,{
      width: '400px',
    })
  }

}
