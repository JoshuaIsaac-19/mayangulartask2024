import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DialogService } from 'src/app/common/services/dialog.service';
import { ElementDataService } from 'src/app/common/services/element-data.service';
import { ProductList, EventValue, EditedDataValue, UpdatedDataResponse, getProductList, AddProductResponse, DeletedProductResponse } from '../modals/common.home';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  constructor(
    private fb:FormBuilder,
    public openDialog: MatDialog, 
    private dialogService: DialogService,
    private elementDataService: ElementDataService,
    private snackBar: MatSnackBar
  ) {}

  newProductListForm!:FormGroup;
  editProductListForm!:FormGroup;
  
  PRODUCTS_DATA: ProductList[]= [];

  displayedProductColumns:string[]= ['id', 'name', 'description', 'price', 'action'];

  editFormDynamicIdValue:number= -1;
  editFormDynamicNameValue:string='';

  productSource= new MatTableDataSource<ProductList>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('delete', {static:true}) delete!: TemplateRef<any>
  @ViewChild('addNewProductTemplate',{ static:true }) addaNewProduct!:TemplateRef<any>
  @ViewChild('editProductTemplate', {static:true}) editProduct!:TemplateRef<any>

  title='Chemicals';
  description= ``

  produtActionArray=[{label:'All', value: 'all'}, {label: 'Below 50', value: '<50'},{label: 'Above 50', value:'>50'}]

  ngOnInit() {
    this.elementDataService.getProductDetails().subscribe((data:getProductList)=>{
      if(data && data.productList && data.productList.count && data.productList.rows){
        this.PRODUCTS_DATA=data.productList.rows;
      }
      this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA);
      this.productSource.paginator = this.paginator;
      this.productSource.sort = this.sort; 
    });
    this.newProductListForm= this.fb.group({
      productName:[''],
      description:[''],
      price:['']
    })
    this.editProductListForm= this.fb.group({
      description:[''],
      price:['']
    })
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, 'Okay',{
      duration:5000
    });
  }

  ngAfterViewInit() {
    this.productSource.paginator= this.paginator;
    this.productSource.sort =this.sort;
  }

  applyFilter(event: Event) {
    const productFilterValues= (event.target as HTMLInputElement).value;
    this.productSource.filter= productFilterValues.trim().toLowerCase();
  }

  onEmit(event:EventValue){
    if(event.value==='all'){
      this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
    } else if(event.value==='<50'){
      const belowFiftyFilter= this.PRODUCTS_DATA.filter(item=>item.price<50 )
      this.productSource= new MatTableDataSource<ProductList>(belowFiftyFilter)
    }else if(event.value==='>50'){
      const aboveFiftyFilter= this.PRODUCTS_DATA.filter(item=> item.price>50)
      this.productSource= new MatTableDataSource<ProductList>(aboveFiftyFilter)
    }
    this.productSource.paginator= this.paginator;
    this.productSource.sort = this.sort;
  }

  addNewProductList(){
    const dialogBox=this.openDialog.open(this.addaNewProduct, {
      autoFocus:false,
      width:'400px',
      panelClass:'new-task-form-color'
    });
    dialogBox.afterClosed().subscribe((response:boolean) =>{
      if(response){
        const length= this.PRODUCTS_DATA.length;
        const newProduct={
          name:this.newProductListForm.value.productName,
          description:this.newProductListForm.value.description,
          price:this.newProductListForm.value.price
        }
        this.elementDataService.addProduct(newProduct).subscribe((productAddedData:AddProductResponse)=>{
          if(productAddedData && productAddedData.success){
            this.elementDataService.getProductDetails().subscribe((data:getProductList)=>{
              this.PRODUCTS_DATA=data.productList.rows;
              this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
              this.productSource.paginator= this.paginator
              this.productSource.sort= this.sort;
              if(length<(this.PRODUCTS_DATA).length){
                this.openSnackBar('The Product has been added, Successfully');
              }
              else{
                this.openSnackBar('Something went wrong, try again!');
              }
            })
          }
          console.log('product added data', productAddedData);
        });
      }
    })
  }

  async editProductList(element:ProductList){
    this.editFormDynamicIdValue=element.id; 
    this.editFormDynamicNameValue= element.name;
    const dialogBox=this.openDialog.open(this.editProduct, {
      autoFocus:false,
      width:'400px',
      panelClass:'new-task-form-color'
    });
    dialogBox.afterClosed().subscribe(async response =>{
      if(response){
        let dataSame= element.description==this.editProductListForm.value.description && element.price==this.editProductListForm.value.price;
        console.log('dataSame',dataSame);
        let noData= this.editProductListForm.value.description=='' && this.editProductListForm.value.price =='';
        console.log('noData', noData);
        let notNull= this.editProductListForm.value.description==null && this.editProductListForm.value.price ==null;
        console.log('notNull', notNull);
        if((dataSame) || (noData) || (notNull)){
          console.log('No data to change');
          this.openSnackBar('No changes found')
        }
        else{
          console.log('Changes found and update is about to be called!');
          const editedDataValues:EditedDataValue={
            description:this.editProductListForm.value.description ? this.editProductListForm.value.description: element.description,
            price: this.editProductListForm.value.price ? this.editProductListForm.value.price : element.price
          }
          await this.elementDataService.updateProductList(element.id.toString(),editedDataValues).subscribe(async (data:UpdatedDataResponse)=>{
            console.log('update raw data', data);
            if(data && data.success && data.updateStatus){
              console.log('reached getAll products for update');
              await this.elementDataService.getProductDetails().subscribe((data:getProductList)=>{
                console.log('before this.PRODUCT_DATA', (this.PRODUCTS_DATA).length);
                this.PRODUCTS_DATA=data.productList.rows;
                console.log('after this.PRODUCT_DATA', (this.PRODUCTS_DATA).length);
                this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
                this.productSource.paginator= this.paginator
                this.productSource.sort= this.sort;
                this.openSnackBar('Successfully Updated!');
              })
            }
            else{
              this.openSnackBar('Something went wrong while updating!');
            }
          })
          console.log('editedDataValues ',editedDataValues);
        }
      }   
    })
    this.editProductListForm.reset();
  }

  onDeleteTableElement(element: ProductList){
    console.log('element on tableElement', element.id);
    const dialogBox= this.dialogService.openConfirmationDialog('Confirmation');
    dialogBox.afterClosed().subscribe(response =>{
      if(response){
        const id=element.id;
        this.elementDataService.deleteProductList((id).toString()).subscribe((deletedData:DeletedProductResponse)=>{
          console.log('deletedData',deletedData);
          if(deletedData && deletedData.success){
            this.elementDataService.getProductDetails().subscribe((data:getProductList)=>{
              console.log('before this.PRODUCT_DATA', (this.PRODUCTS_DATA).length);
              this.PRODUCTS_DATA=data.productList.rows;
              console.log('after this.PRODUCT_DATA', (this.PRODUCTS_DATA).length);
              this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA);
              this.productSource.paginator= this.paginator;
              this.productSource.sort= this.sort;
              if(length<(this.PRODUCTS_DATA).length){
                this.openSnackBar('The Product has been deleted, Successfully!');
              }
              else{
                this.openSnackBar('Something went wrong, try again!');
              }
            })
          }
        })
        this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
        this.productSource.paginator= this.paginator
        this.productSource.sort= this.sort;
      }
      console.log('response: ', response)
    })
  }
}