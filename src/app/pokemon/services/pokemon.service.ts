import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _url: string = 'http://localhost:3000/pokemons'
  

  constructor(private http: HttpClient) { }

  searchPokemons(query: string = ''): Observable<Pokemon[]>  {
    if(query === '') {
      return this.http.get<Pokemon[]>(this._url)
    }else {
      return this.http.get<Pokemon[]>(`${this._url}?q=${query}`)
    }
  }

  searchPokemonById(id: number): Observable<Pokemon>  {
    return this.http.get<Pokemon>(`${this._url}/${id}`)
  }

  updatePokemon(pokemon: Pokemon): void  {
    const headers: HttpHeaders = new HttpHeaders()
    .set('content-type', 'application/json')
    
    this.http.put<Pokemon>(`${this._url}/${pokemon.id}`, pokemon,{headers})
    .subscribe({
      next: (resp) => console.log(resp)
    })
  }
}


