
import { JsonPipe } from '@angular/common';
import { effect, Injectable, signal } from '@angular/core';

const loadFromLocalStorage = (): Character[] => {
  
  const characters = localStorage.getItem('characters');

  return characters ? JSON.parse(characters) : [];



};

@Injectable({providedIn: 'root'})
export class DragonballService {
    
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001},
    { id: 2, name: 'Vegeta', power: 1234},
  ]);

  //Los efectos sirven para hacer cosas secunadrias en la app por ejemplo guardar la 
  //Guardar informacion o mantener la informacion al utilizar un boton
  //Los efectos conocen muy bien a cuales señales atacar
  //Los efectos por lo general es que hagan solo una tarea
  saveToLocalStorage = effect( () => {
      localStorage.setItem('characters', JSON.stringify(this.characters()));
  }

  )
  addCharacter(character: Character){
    this.characters.update((list) => [... list, character]
    )
  }
    
}