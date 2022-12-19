import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { EditPokemonComponent } from './pokemon/edit-pokemon/edit-pokemon.component';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'edit/:id', component: EditPokemonComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
