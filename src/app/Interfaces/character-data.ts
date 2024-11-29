import { CharacterDetail } from "./character-detail";

export interface CharacterData{

    count: number;
    next: string;
    previus: string;
    results: CharacterDetail[];

}