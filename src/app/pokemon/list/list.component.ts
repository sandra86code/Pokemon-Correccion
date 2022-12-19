import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }


  ngOnInit(): void {
  }

  @Input() pokemons: Pokemon[] = [];
}
