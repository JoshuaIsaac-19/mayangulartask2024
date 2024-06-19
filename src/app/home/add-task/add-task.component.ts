import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/common/services/task/task.service';
import { AddTaskResponse, GetAllTasks, RawTaskStructure } from '../modals/common.home';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{

  getAllTaskData!: RawTaskStructure[];

  constructor( private openDialog: MatDialog, private fb: FormBuilder, private taskService: TaskService){}
  newTaskForm!: FormGroup;
  @ViewChild('addTask', {static:true}) addaNewTask!:TemplateRef<any>;

    ngOnInit() {
      this.newTaskForm = this.fb.group({
        taskName: [''],
        description:[''],
        status: [''],
        priority:[''],
        dueDate: ['']
      });
    }

  formatDate(dueDate:Date){
    const d = new Date(dueDate);
    let month = '' + (d.getMonth() + 1);
    let date = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (date.length < 2) date = '0' + date;
  
    return [year, month, date].join('/');
  }

  addNewTask(){
    console.log("AddTask Button Clicked");
    const dialogRef=this.openDialog.open(this.addaNewTask, {
      autoFocus:false,
      width:'400px',
      panelClass:'new-task-form-color'
    });
    dialogRef.afterClosed().subscribe(response =>{
      if(response){
        let dueDate= this.formatDate(this.newTaskForm.value.dueDate);
        const newTaskDate= {
          userId:1,
          txt_taskName:this.newTaskForm.value.taskName,
          txt_description: this.newTaskForm.value.description,
          txt_status: this.newTaskForm.value.status,
          txt_priority: this.newTaskForm.value.priority,
          date_dueDate:dueDate
        }
        this.taskService.createNewTask(newTaskDate).subscribe((data: AddTaskResponse)=>{
          if(data && data.success && data.details.id){
            console.log(data);
            this.taskService.getAllTasks().subscribe((data:GetAllTasks)=>{
              console.log('before data', data);
              if(data && data.success && data.details.count && data.details.rows){
                console.log('success')
                this.taskService.notifyTaskAdded();
                this.getAllTaskData= data.details.rows;
                console.log('this.getAllTaskData',this.getAllTaskData);
              }
            })
            // this.newTaskForm.reset()
          }
        })

      }
      console.log('response: ', response)
    })
  }
}
