import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FlowbiteService } from './Services/flowbite.service';
import { RickAndMortyService } from './Services/rickAndMorty.service';
import { Character } from './Interfaces/character';
import { TitleCasePipe } from '@angular/common';
import { CharacterDetail } from './Interfaces/character-detail';
import { CharacterData } from './Interfaces/character-data';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  characterDetails: CharacterDetail[] = [];
  
  constructor(
    private flowbiteService: FlowbiteService,
    private rickAndMortyService: RickAndMortyService 
  ) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {});
    this.getCharacters();
  }

  getCharacters(): void{
    const observer = {
      next: (characterData: CharacterData) => {
        this.characterDetails = characterData.results;

        for (const character of this.characterDetails) {
          const name = character.name
          this.rickAndMortyService.getCharacter(name).subscribe({
            next:(characterDetailData) => {
              this.characterDetails.push(characterDetailData)
            },
            error: (error) => {
              console.error('Error fetching character details:', error);
            },
          });
        }
      },
      error: (error: any) => {
        console.error('Error fetching pokemons:', error)
      },
    };

    this.rickAndMortyService.getCharacters().subscribe(observer);
  }
}