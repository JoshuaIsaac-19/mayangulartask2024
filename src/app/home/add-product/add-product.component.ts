import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'src/app/common/services/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { ElementDataService } from 'src/app/common/services/element-data.service';
import { PeriodicElement, ProductList } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit,AfterViewInit{
  
  newProductForm!:FormGroup;
  newProductListForm!:FormGroup;

  ELEMENT_DATA: PeriodicElement[] = [];

  constructor(
    private fb:FormBuilder,
    private dialogService: DialogService,
    private openDialog: MatDialog,
    private elementDataService: ElementDataService,
   ){}

   dataSource = new MatTableDataSource<PeriodicElement>();

   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; 
   @ViewChild(MatSort, { static: true }) sort!: MatSort;
   @ViewChild('addNewProductTemplate',{ static:true }) addaNewProduct!:TemplateRef<any>

  ngOnInit(): void {
    this.ELEMENT_DATA = this.elementDataService.getElements();
    this.newProductListForm= this.fb.group({
      productName:[''],
      description:[''],
      price:['']
    })

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.refreshDataSource()
  }
  
  refreshDataSource() {
    const filteredData = this.ELEMENT_DATA.filter(item => item.status === true);
    this.dataSource.data = filteredData;
  }

  // addNewProductList(){
  //   const dialogBox=this.openDialog.open(this.addaNewProduct, {
  //     autoFocus:false,
  //     width:'400px',
  //     panelClass:'new-task-form-color'
  //   });
  //   dialogBox.afterClosed().subscribe(response =>{
  //     if(response){
  //       const newProduct: ProductList={
  //         name:this.newProductListForm.value.productName,
  //         description:this.newProductListForm.value.description,
  //         price:this.newProductListForm.value.price
  //       }
  //       console.log('newProduct', newProduct);
  //       this.elementDataService.addProduct(newProduct).subscribe((productAddedData:any)=>{
  //         console.log('product added data', productAddedData);
  //       });
  //     }
  //   })
  // }

  // addNewProduct(){
  //   const dialogBox=this.openDialog.open(this.addaNewProduct, {
  //     autoFocus:false,
  //     width:'400px',
  //     panelClass:'new-task-form-color'
  //   });
  //   dialogBox.afterClosed().subscribe(response =>{
  //     if(response){
  //       const newElement: PeriodicElement={
  //         position:this.elementDataService.getElements().length+1,
  //         name:this.newProductForm.value.productName,
  //         weight:parseFloat(this.newProductForm.value.weight),
  //         symbol:this.newProductForm.value.symbol,
  //         availability:this.newProductForm.value.availability,
  //         status:true
  //       }
  //       this.ELEMENT_DATA= this.elementDataService.getElements();
  //       this.refreshDataSource();
  //       const lowDegreeFilter= this.ELEMENT_DATA.filter(item=>item.status === true)
  //       this.dataSource= new MatTableDataSource<PeriodicElement>(lowDegreeFilter)
  //       this.dataSource.paginator= this.paginator;
  //       console.log('printing paginator', this.paginator);
  //       this.dataSource.sort = this.sort;
  //       console.log(this.newProductForm.value)
  //     }
  //   })
  // }
}
