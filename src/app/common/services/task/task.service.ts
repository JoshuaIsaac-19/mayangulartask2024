import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskStructure } from 'src/app/home/modals/common.home';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5002/task/';

  
  constructor( private httpClient: HttpClient ) { }

  createNewTask(newTaskForm:any) {
    console.log(this.apiUrl,newTaskForm)
    return this.httpClient.post((this.apiUrl),newTaskForm) as any;
  }

}
