import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @ViewChild('editTask', { static: true }) editTask!: TemplateRef<any>;

  newTaskForm!: FormGroup;

  ngOnInit() {
    this.newTaskForm = this.fb.group({
      taskName: [''],
      description: [''],
      status: [''],
      priority: [''],
      dueDate: ['']
    });
  }
}
