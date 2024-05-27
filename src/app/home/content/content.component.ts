import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  exists: boolean=true;
  taskContent:{title:string,description:string, status:string, priority:string}={
    title: 'React',
    description: 'Just a description',
    status: 'In progress',
    priority: 'High'
  }

  moreTaskContent:{title:string, description:string, status:string, priority:string}[]=
  [{
      title: 'Angular',
      description: 'This is a random description for a task tracker. Prettry weird.',
      status: 'Completed',
      priority: 'Very High'
    },
    {
      title: 'Node JS',
      description: 'This is a random description for a task tracker. Prettry weird for Node JS.',
      status: 'Completed',
      priority: 'Medium'
    },
    {
      title: 'Java',
      description: 'This is a random description for a task tracker. That too for a Java language.',
      status: 'Completed',
      priority: 'Low'
    }
  ]
}

  // categories: { name: string, items: string[] }[] = [
  //   { name: 'Category 1', items: ['Item 1.1', 'Item 1.2'] },
  //   { name: 'Category 2', items: ['Item 2.1', 'Item 2.2', 'Item 2.3'] }
  // ];

