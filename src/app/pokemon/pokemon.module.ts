import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    EditPokemonComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    ListComponent,
    EditPokemonComponent
  ]
})
export class PokemonModule { }
