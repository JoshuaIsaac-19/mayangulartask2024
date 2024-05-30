import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { DialogService } from 'src/app/common/services/dialog.service';
// let obj2 = _.cloneDeep(obj);
export interface PeriodicElement {
  [x: string]: any;
  name: string;
  position: number;
  weight: number;
  symbol: string;
  availability:string;
  status: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  constructor(
    public openDialog: MatDialog, 
    private dialogService: DialogService){}

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'availability', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('delete', {static:true}) delete!: TemplateRef<any>
  title='Chemicals';
  description= `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
    took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
    but also the leap into electronic typesetting, remaining essentially unchanged.`

  actionArray=[{ label:'Available', value:'Available'},{ label:'Not Available', value:'Not available'},{label:'All', value:'all'}]

  ngOnInit() {
    const filterValue= this.ELEMENT_DATA.filter(item=>item.status === true)
    this.dataSource= new MatTableDataSource<PeriodicElement>(filterValue)
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
    if(event.value==='all'){
      const lowDegreeFilter= this.ELEMENT_DATA.filter(item=>item.status === true)
      this.dataSource= new MatTableDataSource<PeriodicElement>(lowDegreeFilter)
    } else{
      console.log(event.value);
      const lowDegreeFilter= this.ELEMENT_DATA.filter(item=> item.status=== true)
      console.log(lowDegreeFilter);
      const filterValue2= lowDegreeFilter.filter(item=>item.availability === event.value)
      this.dataSource= new MatTableDataSource<any>(filterValue2);
    }
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort = this.sort;
  }
  onDeleteTableElement(element: PeriodicElement){

    const dialogBox= this.dialogService.openConfirmationDialog('Nothing');
    dialogBox.afterClosed().subscribe(response =>{
      if(response){
        element.status=false;
        const lowDegreeFilter= this.ELEMENT_DATA.filter(item=>item.status === true)
        this.dataSource= new MatTableDataSource<PeriodicElement>(lowDegreeFilter)
        this.dataSource.paginator= this.paginator
      }
      console.log('response: ', response)
    })
  }

}