import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/pokemon/interfaces/pokemon';
import { PokemonService } from '../../pokemon/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  pokemons!: Pokemon[];

  constructor(private pokemonService : PokemonService) { }

  ngOnInit(): void {
  }

  searchPokemons (query: string): void {
    console.log(query)
    this.pokemonService.searchPokemons(query)
    .subscribe({
      next: (resp) => {
        this.pokemons = resp
        console.log(this.pokemons)
      },
      error: (err) => {
        this.pokemons = []
        console.log(this.pokemons)
      }
    })
  }
}
