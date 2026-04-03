import { Component, computed, signal } from "@angular/core";
import { UpperCasePipe } from '@angular/common';


@Component({
    templateUrl: './hero.component.html',
    imports: [UpperCasePipe]
})

export class hero {

    name = signal('Ironman')
    age = signal(45)

    heroDescription = computed(() => {
        const descripccion = `${ this.name() } - ${this.age()} `;
        return descripccion;
    })

    nombreMayuscula = computed (() => {
        const nombre = ` ${this.name().toUpperCase()} `;
        return nombre;
    })

    changeHero(){
        this.name.set('Spiderman')
        this.age.set(22)
    }
    
    resetForm(){
        this.name.set('Ironman')
        this.age.set(45)
    }

    changeAge(){
        this.age.set(60)
    }
}
