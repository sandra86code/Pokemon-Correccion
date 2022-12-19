import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html'
})
export class EditPokemonComponent implements OnInit {


  constructor(private route: ActivatedRoute, private pokemonService : PokemonService) { }

  pokemon!: Pokemon;
  myPokemon!: {id: number};
  paramsSubscription!: Subscription;
  
  

  ngOnInit(): void {
    this.myPokemon = {
      id: this.route.snapshot.params['id'],
    };
    this.pokemonService.searchPokemonById(this.myPokemon.id)
    .subscribe(data => {
      this.pokemon=data;
    });

  }

  editPokemon() {
    this.pokemonService.updatePokemon(this.pokemon.id, this.pokemon);
  }
}
