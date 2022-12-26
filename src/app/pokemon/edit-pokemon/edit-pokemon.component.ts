import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html'
})
export class EditPokemonComponent implements OnInit {
  
  pokemon!: Pokemon;
  disabled: boolean = true;

  constructor(private route: ActivatedRoute, private pokemonService : PokemonService,
    private router: Router) { }

  
    ngOnInit(): void {
    this.pokemonService.searchPokemonById(this.route.snapshot.params['pokemon'])
    .subscribe( {
      next: (resp) => this.pokemon= resp
    });

  }

  editPokemon(): void {
    this.pokemonService.updatePokemon(this.pokemon);
    this.router.navigate(['/']);
  }

  enableSave(): void {
    this.disabled = false;
  }
}
