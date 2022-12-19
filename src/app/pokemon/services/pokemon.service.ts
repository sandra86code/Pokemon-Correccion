import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _url: string = 'http://localhost:3000/pokemons'
  

  constructor(private http: HttpClient) { }

  searchPokemons(query: string): Observable<Pokemon[]>  {

    return this.http.get<Pokemon[]>(`${this._url}?q=${query}`)
  }

  searchPokemonById(id: number): Observable<Pokemon>  {
    return this.http.get<Pokemon>(`${this._url}/${id}`)
  }

  updatePokemon(id: number, pokemon: Pokemon): Observable<Pokemon>  {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(pokemon);
    return this.http.put<Pokemon>(`${this._url}/${id}`, body,{'headers':headers})
  }
}


