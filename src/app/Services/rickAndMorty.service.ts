import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterData } from '../Interfaces/character-data';
import { CharacterDetail } from '../Interfaces/character-detail';

@Injectable({ providedIn: 'root' })
export class RickAndMortyService {
    private apiUrl = "https://rickandmortyapi.com/api/character";

    constructor(private http: HttpClient) {}

    getCharacters(): Observable<CharacterData>{
        return this.http.get<CharacterData>(`${this.apiUrl}`)
    }

    getCharacter(name: string): Observable<CharacterDetail>{
        return this.http.get<CharacterDetail>(`${this.apiUrl}/${name}`)
    }

}