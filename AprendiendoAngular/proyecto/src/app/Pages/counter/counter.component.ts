import { Component, signal } from "@angular/core";


@Component({
    templateUrl: './counter.component.html',
    styleUrl: './counter.component.scss',
})


export class CounterPage{

    counter = 10
    
    counterSignal = signal(10)


    constructor() {
    
    }

    increaseBy(value: number){
        this.counter += value
        this.counterSignal.update((current) => current + value )
    }

    resetCounter (){
        this.counter = 0
        this.counterSignal.set(0)
    }   
}