import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  constructor(
    public openDialog: MatDialog, 
    private dialogService: DialogService,
    private elementDataService: ElementDataService,
    private snackBar: MatSnackBar
  ){}

  ELEMENT_DATA: PeriodicElement[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'availability', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();

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
    this.ELEMENT_DATA = this.elementDataService.getElements();
    const filterValue= this.ELEMENT_DATA.filter(item=>item.status === true)
    this.dataSource= new MatTableDataSource<PeriodicElement>(filterValue)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }

  openSnackBar() {
    this.snackBar.open('Successfully Deleted', 'Okay');
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
    const dialogBox= this.dialogService.openConfirmationDialog('Confirmation');
    dialogBox.afterClosed().subscribe(response =>{
      if(response){
        element.status=false;
        const lowDegreeFilter= this.ELEMENT_DATA.filter(item=>item.status === true)
        this.dataSource= new MatTableDataSource<PeriodicElement>(lowDegreeFilter)
        this.dataSource.paginator= this.paginator
      }
      this.openSnackBar();
      console.log('response: ', response)
    })
  }
}