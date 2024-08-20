import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss']
})
export class TaskFilterComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() actionArray!: any[];
  @Output() actionEmit= new EventEmitter<any>();

  selectedChip: object={};

  ngOnInit(): void { 
    this.selectedChip= this.actionArray.find(action=>action.value ==='all');
    console.log("this.selectedChip ", this.selectedChip);
    if(this.selectedChip) {
      this.onActionEmit(this.selectedChip);
    }
  }
  onActionEmit(event: any){
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
