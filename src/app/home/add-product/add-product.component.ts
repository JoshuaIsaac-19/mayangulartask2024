import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeriodicElement } from '../table/table.component';
import { DialogService } from 'src/app/common/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  
  newProductForm!:FormGroup;
  ELEMENT_DATA!: PeriodicElement;

  constructor(
    private fb:FormBuilder,
    private dialogService: DialogService,
    private openDialog: MatDialog
   ){}

  @ViewChild('addNewProductTemplate',{ static:true }) addaNewProduct!:TemplateRef<any>

  ngOnInit(): void {
    this.newProductForm = this.fb.group({
      productName: [''],
      weight:[''],
      symbol: [''],
      availability:['']
    });
  }

  addNewProduct(){
    const dialogBox=this.openDialog.open(this.addaNewProduct, {
      autoFocus:false,
      width:'400px',
      panelClass:'new-task-form-color'
    });
    dialogBox.afterClosed().subscribe(response =>{
      if(response){
        console.log(this.newProductForm.value)
        this.newProductForm.reset()
      }
      console.log('response: ', response)
    })
  }
}
