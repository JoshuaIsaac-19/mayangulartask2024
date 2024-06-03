import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement, ProductList } from 'src/app/home/table/table.component';

@Injectable({
  providedIn: 'root'  
})
export class ElementDataService{
  
  private apiUrl = 'http://localhost:5000/v1/product';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', availability: "Available", status:true},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', availability: "Available", status:true},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', availability: "Available", status:true},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', availability: "Not available", status:true},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', availability: "Available", status:true},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', availability: "Available", status:true},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', availability: "Available", status:true},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', availability: "Available", status:true},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', availability: "Available", status:true},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', availability: "Available", status:true},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', availability: "Not available", status:true},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', availability: "Available", status:true},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', availability:"Available", status:false},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', availability: "Available", status:true},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', availability: "Available", status:true},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', availability: "Available", status:true},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', availability: "Available", status:false},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', availability: "Available", status:true},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', availability: "Available", status:true},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', availability: "Available", status:true}
  ];
 
  dataSource = new MatTableDataSource<PeriodicElement>();

  constructor(
    private httpClient:HttpClient
  ) {}

  getElements(): PeriodicElement[] {
    return this.ELEMENT_DATA;
  }
  addElement(element:PeriodicElement):void {
    // return this.httpClient.get('http://localhost:5000/v1/product');
    this.ELEMENT_DATA.push(element);
    // this.elementAdded.emit();
  }

  addProduct(product:object) {
    console.log(this.apiUrl,product)
    return this.httpClient.post((this.apiUrl),product);
  }
  getProductDetails(){
    return this.httpClient.get(this.apiUrl);
  }
  deleteProductList(id:string){
    return this.httpClient.delete(`${this.apiUrl}/${id}`)
  }
}
