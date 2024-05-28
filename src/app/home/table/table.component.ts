import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status:"available"},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status:"available"},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status:"available"},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status:"not available"},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status:"available"},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status:"available"},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status:"available"},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status:"available"},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status:"not available"},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status:"available"},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', status:"not available"},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', status:"available"},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', status:"available"},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', status:"available"},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', status:"available"},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', status:"available"},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', status:"available"},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', status:"available"},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', status:"available"},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', status:"available"}
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  title='Chemicals';
  description= `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
    but also the leap into electronic typesetting, remaining essentially unchanged.`

  actionArray=[{label:'Available', value:'available'},{label:'Not Available', value:'not available'}]

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEmit(event:any){
    console.log('onEmit', event);
    const filterValue= this.ELEMENT_DATA.filter(item=>item.status === event.value)
    this.dataSource= new MatTableDataSource<any>(filterValue);
    this.dataSource.paginator= this.paginator;

  }
}