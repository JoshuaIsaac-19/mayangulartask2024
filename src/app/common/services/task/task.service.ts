import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GetAllTasks, RawTaskStructure, TaskStructure } from 'src/app/home/modals/common.home';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = 'http://localhost:5002/task/';
  private taskAddedSource = new Subject<void>();
  taskAdded$ = this.taskAddedSource.asObservable()

  constructor(private httpClient: HttpClient) { }

  createNewTask(newTaskForm: any) {
    console.log(this.apiUrl, newTaskForm)
    return this.httpClient.post((this.apiUrl), newTaskForm) as any;
  }

  updateTask(editTaskForm:any){
    console.log(editTaskForm);
    return this.httpClient.put((this.apiUrl), editTaskForm) as any;
  }

  upsertTask(newTaskForm: any) {
    return this.httpClient.post((this.apiUrl+"upsertTaskData"), newTaskForm) as any;
  }

  getAllTasks(): Observable<any> {
    console.log(this.apiUrl);
    return this.httpClient.get(this.apiUrl) as any; 
  }

  deleteTask(taskId:any){
    console.log("taskId",taskId);
    return this.httpClient.delete(`${this.apiUrl}/${taskId}`) as any;
  }

  notifyTaskAdded() {
    console.log("this.taskAddedSource", this.taskAddedSource);
    this.taskAddedSource.next();
  }

  getSimpleTable(){
    return this.httpClient.get(this.apiUrl+"/testing") as any;
  }
  
}
