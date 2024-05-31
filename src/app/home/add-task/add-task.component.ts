import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  constructor( private openDialog: MatDialog, private fb: FormBuilder){}
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
        this.newTaskForm.reset()
      }
      console.log('response: ', response)
    })
  }
}
