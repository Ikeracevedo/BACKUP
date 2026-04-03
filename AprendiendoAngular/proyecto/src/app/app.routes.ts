import { Routes } from '@angular/router';
import { CounterPage } from './Pages/counter/counter.component';
import { hero } from './Pages/hero/hero.component';
import { Dragonball } from './Pages/dragonball/dragonball';

export const routes: Routes = [
    {
        path: '',
        component: CounterPage
    },
    {
        path: 'hero',
        component: hero
    },
    {
        path: 'dragonball',
        component: Dragonball
    },
     {
        path: 'dragonball-super',
        component: Dragonball
    },
    {
        path: '**',
        redirectTo: ''
    },
];
