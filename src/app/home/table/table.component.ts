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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  availability:string;
  status: boolean;
}

export interface ProductList{
  name:string,
  description:string,
  price:number
}

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
  ELEMENT_DATA: PeriodicElement[] = [];
  PRODUCTS_DATA: ProductList[]= [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'availability', 'action'];
  displayedProductColumns:string[]= ['id', 'name', 'description', 'price', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  productSource= new MatTableDataSource<ProductList>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('delete', {static:true}) delete!: TemplateRef<any>
  @ViewChild('addNewProductTemplate',{ static:true }) addaNewProduct!:TemplateRef<any>

  title='Chemicals';
  description= `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
    but also the leap into electronic typesetting, remaining essentially unchanged.`

  actionArray=[{ label:'Available', value:'Available'},{ label:'Not Available', value:'Not available'},{label:'All', value:'all'}]
  produtActionArray=[{label:'All', value: 'all'}, {label: 'Below 50', value: '<50'},{label: 'Above 50', value:'>50'}]

  ngOnInit() {
    console.log('ngOnInit started');
    this.elementDataService.getProductDetails().subscribe((data:any)=>{
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

    this.ELEMENT_DATA = this.elementDataService.getElements();
    const filterValue= this.ELEMENT_DATA.filter(item=>item.status === true)
    this.dataSource= new MatTableDataSource<PeriodicElement>(filterValue)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
    console.log('ngOnInit ended');
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, 'Okay',{
      duration:5000
    });
  }

  ngAfterViewInit() {
    this.productSource.paginator= this.paginator;
    this.productSource.sort =this.sort;

    this.dataSource.paginator = this.paginator;
    console.log('Paginator ngAfterViewInit:', this.paginator);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    const productFilterValues= (event.target as HTMLInputElement).value;
    this.productSource.filter= productFilterValues.trim().toLowerCase();
  }

  onEmit(event:any){
    console.log('onEmit', event);
    if(event.value==='all'){
      this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
    } else if(event.value==='<50'){
      const belowFiftyFilter= this.PRODUCTS_DATA.filter(item=> item.price<50)
      this.productSource= new MatTableDataSource<ProductList>(belowFiftyFilter)
      console.log('belowFiftyFilter ',belowFiftyFilter)
    }else if(event.value==='>50'){
      const aboveFiftyFilter= this.PRODUCTS_DATA.filter(item=> item.price>50)
      this.productSource= new MatTableDataSource<ProductList>(aboveFiftyFilter)
      console.log('aboveFiftyFilter', aboveFiftyFilter);
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
    dialogBox.afterClosed().subscribe(response =>{
      if(response){
        const newProduct={
          name:this.newProductListForm.value.productName,
          description:this.newProductListForm.value.description,
          price:this.newProductListForm.value.price
        }
        console.log('newProduct', newProduct);
        this.elementDataService.addProduct(newProduct).subscribe((productAddedData:any)=>{
          console.log('product added data', productAddedData);
        });
      }
      this.elementDataService.getProductDetails().subscribe((data:any)=>{
        console.log('before ', this.PRODUCTS_DATA);
        this.PRODUCTS_DATA=data
        console.log('after ', this.PRODUCTS_DATA);
      })
      this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
      this.productSource.paginator= this.paginator
      this.productSource.sort= this.sort;
      this.openSnackBar('The Product has been added');
    })
  }

  onDeleteTableElement(element: PeriodicElement){
    const dialogBox= this.dialogService.openConfirmationDialog('Confirmation');
    dialogBox.afterClosed().subscribe(response =>{
      if(response){
        this.elementDataService.getProductDetails().subscribe((data:any)=>{
          console.log('before ', this.PRODUCTS_DATA);
          this.PRODUCTS_DATA=data
          console.log('after ', this.PRODUCTS_DATA);
        })
        this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA)
        this.productSource.paginator= this.paginator
        this.productSource.sort= this.sort;
        this.openSnackBar('The product has been deleted');
      }
      console.log('response: ', response)
    })
  }
  // softDeleteProduct(element:ProductList){
  //   const dialogBox= this.dialogService.openConfirmationDialog('Confirmation');
  //   console.log('product element ',element);
  //   dialogBox.afterClosed().subscribe(response =>{
  //     if(response){
  //       this.elementDataService.softDeleteProductList({id:element.id}).subscribe((data:any)=>{
  //         console.log('deleteProductListRes', data)
  //       })
  //       this.elementDataService.getProductDetails().subscribe((data:any)=>{
  //         if(data && data.productList && data.productList.count && data.productList.rows){
  //           this.PRODUCTS_DATA=data.productList.rows;
  //         }
  //         this.productSource= new MatTableDataSource<ProductList>(this.PRODUCTS_DATA);
  //         this.productSource.paginator = this.paginator;
  //         this.productSource.sort = this.sort; 
  //       });
  //       this.openSnackBar();
  //     }
  //     console.log('response: ', response)
  //   })
  // }
}