import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() actionArray!: any[];
  @Output() actionEmit= new EventEmitter<any>();

  constructor(){}

  ngOnInit(): void { 
    console.log('title', this.title)
    console.log('description', this.description);
    console.log('actionArray', this.actionArray);
  }
  onActionEmit(event: any){
    console.log('onActionEmit', event);
    this.actionEmit.emit(event)
  }
}
