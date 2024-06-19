import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {

  editTaskForm!: FormGroup;
  @ViewChild('editTask', {static:true}) editATask!:TemplateRef<any>;

  constructor(private openDialog: MatDialog){}

  openEditTask(){
    const dialogRef=this.openDialog.open(this.editATask, {
      autoFocus:false,
      width:'400px',
      panelClass:'new-task-form-color'
    });
    dialogRef.afterClosed().subscribe(response=>{
      if(response){
        console.log(response);
      }
    })
  }

 
}
