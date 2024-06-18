import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/common/services/task/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
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

  addNewTask(){
    console.log("AddTask Button Clicked");
    const dialogRef=this.openDialog.open(this.addaNewTask, {
      autoFocus:false,
      width:'400px',
      panelClass:'new-task-form-color'
    });
    dialogRef.afterClosed().subscribe(response =>{
      if(response){
        console.log(this.newTaskForm.value)
        const newTaskDate= {
          taskName:this.newTaskForm.value.taskName,
          description: this.newTaskForm.value.declaration,
          status: this.newTaskForm.value.status,
          priority: this.newTaskForm.value.priority,
          dueDate:this.newTaskForm.value.dueDate
        }
        this.taskService.createNewTask(this.newTaskForm.value).subscribe((data:any)=>{
          if(data && data.success){
            console.log(data);
            this.newTaskForm.reset()
          }
        })

      }
      console.log('response: ', response)
    })
  }
}
