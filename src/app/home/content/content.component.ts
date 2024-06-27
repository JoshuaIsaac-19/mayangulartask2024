import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from 'src/app/common/services/task/task.service';
import { GetAllTasks, RawTaskStructure } from '../modals/common.home';
import { Subscription } from 'rxjs';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {

  getAllTaskData!: RawTaskStructure[];
  private taskAddedSubscription!: Subscription;
  exists: boolean = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTasksData()
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

}
