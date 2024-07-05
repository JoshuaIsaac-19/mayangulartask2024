import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AddEditService {

  constructor(public dialog: MatDialog) { }

  // addEditTask() {
  //   const dialogBoxForm = this.dialog.open(, {
  //     data: {

  //     }
  //   })
  // }
}
