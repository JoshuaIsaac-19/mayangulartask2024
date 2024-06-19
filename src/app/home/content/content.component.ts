import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { GetAllTasks, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
// import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit{
  
  getAllTaskData!: RawTaskStructure[];
  private taskAddedSubscription!: Subscription;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe((data:GetAllTasks)=>{
      console.log('before data', data);
      if(data && data.success && data.details.count && data.details.rows){
        console.log('success')
        this.getAllTaskData= data.details.rows;
        console.log('this.getAllTaskData',this.getAllTaskData);
      }
    })
  }

  exists: boolean= true;
  
}
