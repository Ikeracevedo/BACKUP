import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character{
  id: number;
  name: string;
  power: number;
}

@Component({
  imports: [],
  templateUrl: './dragonball.html',
  styleUrl: './dragonball.css'
})
export class Dragonball {

  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001},
    //{ id: 2, name: 'Vegeta', power: 1234},
    //{ id: 3, name: 'Gohan', power: 4321},
    //{ id: 4, name: 'Yamcha', power: 500},
  ]);

  addCharacter(){
    console.log(this.name(), this.power());
  }

}

