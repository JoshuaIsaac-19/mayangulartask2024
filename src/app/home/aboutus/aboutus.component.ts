import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit{
  
  constructor(private taskService: TaskService){}

  testGlobalData:any;

  ngOnInit(): void {
    this.loadSimpleTasksDetails();
  }

  loadSimpleTasksDetails(){
    this.taskService.getSimpleTable().subscribe((res:any)=>{
      console.log("loadSimpleTasksDetails: ", res);
    })
  }

  addSimpleData(){
    
  }
  
}
