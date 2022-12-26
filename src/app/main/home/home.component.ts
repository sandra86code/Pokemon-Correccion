import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/pokemon/interfaces/pokemon';
import { PokemonService } from '../../pokemon/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  pokemons: Pokemon[] = [];
  showSearch: boolean = false;

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.searchPokemons()
    .subscribe( {
      next: (resp)=>this.pokemons = resp
    })
  }

  hide(): void {
    this.showSearch = !this.showSearch;
  }


  searchPokemons (query: string): void {
    this.pokemonService.searchPokemons(query)
    .subscribe({
      next: (resp) => this.pokemons = resp
    })
  }
}
