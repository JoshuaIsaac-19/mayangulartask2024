import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  results = [
    {id :  1, summary : "These are the results for the searched text" },
    {id :  2, summary : " Here are some more results you searched for" },
    {id :  3, summary : "Searching for answers, are we?" },
    {id :  4, summary : "What more could you ask for?" }
  ]

  isSpecial:boolean =true;

  searchTerm!:string;
  constructor() {}

  ngOnOnit(){

  }
  updateSearch(e:any){
    this.searchTerm=e.target.value
  }
}
