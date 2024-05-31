import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog:MatDialog ) { }

  openConfirmationDialog(message:string , className?: string){
    const dialogBox= this.dialog.open(DialogBoxComponent, {
      data:{
        header:'Confirmation',
        content:message,
        actionType:'Confirmation'
      },
      autoFocus:false
    });
    return dialogBox; 
  }
}
