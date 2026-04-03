import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-nosotros',
  standalone: false,
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss',
})
export class Nosotros implements OnInit {
  
  ngOnInit() {
    // Inicializar AOS para las animaciones
    AOS.init({ 
      duration: 1000, 
      once: true,
      offset: 100
    });
  }
}
