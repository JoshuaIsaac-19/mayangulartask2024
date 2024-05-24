import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module/material.module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  constructor(private _router:Router, private openDialog: MatDialog,   private fb: FormBuilder){}
  newTaskForm!: FormGroup;
  @ViewChild('addTask', {static:true}) addaNewTask!:TemplateRef<any>;

    ngOnInit() {
      this.newTaskForm = this.fb.group({
        taskName: [''],
        status: [''],
        dueDate: ['']
      });
    }


  addNewTask(){
    console.log("AddTask Button Clicked");
    const dialogRef=this.openDialog.open(this.addaNewTask, {
      autoFocus:false,
      width:'400px'
    });
    dialogRef.afterClosed().subscribe(response =>{
      if(response){
        console.log(this.newTaskForm.value)
        // console.log(this.newTaskForm.value.taskName);
        // console.log(this.taskStatus);
        // console.log(this.dueDate)
        this.newTaskForm.reset()
      }
      console.log('response: ', response)
    })
  }
}
