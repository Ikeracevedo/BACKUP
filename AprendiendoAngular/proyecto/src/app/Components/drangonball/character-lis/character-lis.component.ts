import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'drangonball-character-lis',
  imports: [],
  templateUrl: './character-lis.component.html',
})
export class CharacterLisComponent {

  characters = input.required<Character[]>()
  listname = input.required<string>()




 }
