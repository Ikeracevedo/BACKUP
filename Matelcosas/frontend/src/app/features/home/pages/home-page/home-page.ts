import { Component, NgModule, OnInit } from '@angular/core';
import * as AOS from 'aos';


@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage implements OnInit {

  animateCount(elementId: string, target: number, duration: number = 2000) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const start = 0;
    const range = target - start;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
      current += 1;
      el.textContent = current.toString();
      if (current === target) clearInterval(timer);
    }, stepTime);
  }

  ngOnInit() {
    AOS.init({ duration: 1000, once: true });
    setTimeout(() => {
      this.animateCount('clientes', 800);
      this.animateCount('productos', 1600);
      this.animateCount('empresas', 70);
    }, 500);
  }

  certifications = [
    {
      icon: 'fas fa-certificate',
      title: 'RETIE Certificado',
      description: 'Cumplimos con el Reglamento Técnico de Instalaciones Eléctricas'
    },
    {
      icon: 'fa-solid fa-check',
      title: 'ISO 9001',
      description: 'Gestión de calidad certificada internacionalmente'
    },
    {
      icon: 'fas fa-bolt',
      title: 'NTC 2050',
      description: 'Norma técnica colombiana para instalaciones eléctricas'
    },
    {
      icon: 'fas fa-award',
      title: 'Garantía Extendida',
      description: 'Todos nuestros productos incluyen garantía del fabricante'
    }
  ];

  deliverySteps = [
    {
      icon: 'fas fa-shopping-cart',
      title: 'Realiza tu pedido',
      description: 'Selecciona los productos y completa tu compra en línea'
    },
    {
      icon: 'fa-solid fa-check',
      title: 'Verificación',
      description: 'Confirmamos disponibilidad y preparamos tu pedido'
    },
    {
      icon: 'fas fa-truck',
      title: 'Envío',
      description: 'Despachamos con empresas certificadas y tracking'
    },
    {
      icon: 'fas fa-home',
      title: 'Entrega',
      description: 'Recibe en tu domicilio en 24-48 horas'
    }
  ];

  certificadoRETIE(){
    window.open('https://www.retieretilap.com.co/?gad_source=1&gad_campaignid=22788012930&gbraid=0AAAAA9r4xQgZ0mZACaTCFKwgE7o3vE8Q5&gclid=CjwKCAiAu67KBhAkEiwAY0jAlQQvFv54cee407l4bHMniiJiFZSW5k7djdkJr0BglFyAS6Wh11ejdxoCeHwQAvD_BwE', '_blank')
  }
  cerrificadoISO(){
    window.open('https://www.iso.org/es/contents/data/standard/06/20/62085.html', '_blank')
  }
  certificadoNTC(){
    window.open('https://asieb.com/wp-content/uploads/2024/10/NTC_2050_codigo_electrico_nacional.pdf', '_blank')
  }

  abrirWhatsapp() {
    const numero = '573123559963'; 
    const mensaje = 'Hola, quiero más información acerca de los productos electricos';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  Abrirllamar() {
    const phone = '57312559963';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `tel:${phone}`;
    } else {
        alert('Llámanos al 300 123 4567');
    }
  }

}


