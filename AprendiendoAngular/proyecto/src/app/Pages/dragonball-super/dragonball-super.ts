import { Component, computed, inject, signal } from '@angular/core';
import { CharacterLisComponent } from "../../Components/drangonball/character-lis/character-lis.component";
import { CharacterAddComponent } from "../../Components/drangonball/character-app/character-add.component";
import { DragonballService } from '../../service/dragonball.service';


@Component({
  imports: [CharacterLisComponent, CharacterAddComponent],
  templateUrl: './dragonball-super.html',
  selector: 'dragonball-super'
})
export class Dragonballsuper{

  
  public dragonballService = inject(DragonballService);

  
  
  

}

