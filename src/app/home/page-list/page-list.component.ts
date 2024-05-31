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

  selectedChip: object={};
  constructor(){}

  ngOnInit(): void { 
    // console.log('title', this.title)
    // console.log('description', this.description);
    // console.log('actionArray', this.actionArray);

    this.selectedChip= this.actionArray.find(action=>action.value ==='all');
    console.log(this.selectedChip);
    if(this.selectedChip) {
      this.onActionEmit(this.selectedChip);
    }
  }
  onActionEmit(event: any){
    // console.log('event' ,event)
    if(this.selectedChip!==event){
      console.log('onActionEmit', event);
      this.selectedChip=event;
      this.actionEmit.emit(event)
    }else {
      // If the same chip is clicked, emit the event to maintain the selection
      this.actionEmit.emit(this.selectedChip);
    }
   
  }
}