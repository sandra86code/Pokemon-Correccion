import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  filterNom : string = "";

  @Output() onNewFilterNom:EventEmitter<string> = new EventEmitter();

  searchPokemons(): void {
    this.onNewFilterNom.emit(this.filterNom);
    this.filterNom="";
  }
}
