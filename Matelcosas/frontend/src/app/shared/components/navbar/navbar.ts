import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  abrirWhatsapp() {
      const numero = '573123559963'; 
      const mensaje = 'Hola, quiero más información acerca de los productos electricos';
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    }
}
