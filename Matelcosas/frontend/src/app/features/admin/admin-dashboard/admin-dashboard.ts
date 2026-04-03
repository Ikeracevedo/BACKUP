import { Component, OnInit } from '@angular/core';
import { AdminService } from '../data/admin.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';


interface Resumen {
 productos: number;
 categorias: number;
 pendientes: number; 
}

interface EstadisticasProductos {
  total: number;
  activos: number;
  inactivos: number;
  sinStock: number;
  stockTotal: number;
}

interface EstadisticasCategorias {
  total: number;
  activas: number;
  inactivas: number;
}

interface EstadisticasContactos {
  total: number;
  atendidos: number;
  pendientes: number;
  recientes: any[];
}

interface TopProducto {
  nombre: string;
  vistas: number;
  stock: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
  standalone: false
})


export class AdminDashboard implements OnInit {
  resumen = { productos: 0, categorias: 0, pendientes: 0 };

  estadisticasProductos: EstadisticasProductos = {
    total: 0,
    activos: 0,
    inactivos: 0,
    sinStock: 0,
    stockTotal: 0
  };

  estadisticasCategorias: EstadisticasCategorias = {
    total: 0,
    activas: 0,
    inactivas: 0
  };

  estadisticasContactos: EstadisticasContactos = {
    total: 0,
    atendidos: 0,
    pendientes: 0,
    recientes: []
  };


  cargando = true;
  
  //Inyectamos el servicio para traer los datos de la api del backend
  constructor(private adminService: AdminService) {}

  //Cargamos el dashboard para cada vez que se inicie el componente
  ngOnInit(): void {
    this.cargarDashboard();
  }
  
  //Funcion para actualizar o traer todos los datos para mostrar
  cargarDashboard() {
    //Indicador de carga
    this.cargando = true;
    
    //ForkJoin para hacer peticiones simultaneas a la hora de traer los datos
    forkJoin({
      //Lleno cada una de array con sus datos
      productos: this.adminService.obtenerProductos(),
      categorias: this.adminService.obtenerCategorias(),
      contactos: this.adminService.obtenerContactos()
    }).subscribe({
      next: (data) => {
        //Proceso los datos para mostrar el resumen
        this.procesarProductos(data.productos);
        this.procesarCategorias(data.categorias);
        this.procesarContactos(data.contactos);
        this.calcularResumen();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el dashboard: ', err);
        this.cargando = false;

        Swal.fire({
          icon: 'error',
          title:'Error al cargar los datos',
          text:'No se lograron cargar las estadisticas del dashboard',
          confirmButtonText:'Aceptar'
        });
      }
    });
  }

  //Calculo los datos de las categorias, productos y contactos
  procesarProductos(productos: any[]) {
    //Dentro de cada interfaz guardo los productos 
    //Cantidad de productos
    this.estadisticasProductos.total = productos.length;
    //Productos activos
    this.estadisticasProductos.activos = productos.filter(p => p.estado === 'activo').length;
    //Productos inactivos
    this.estadisticasProductos.inactivos = productos.filter(p => p.estado === 'inactivo').length;
    //Calculo el inventario
    this.estadisticasProductos.sinStock = productos.filter(p => p.stockTotal === 0).length;
    this.estadisticasProductos.stockTotal = productos.reduce((sum, p) => sum + (p.stockTotal || 0), 0);
  }

  //Proceso los datos de cada categoria
  procesarCategorias(categorias: any[]) {
    //Numero total de categorias
    this.estadisticasCategorias.total = categorias.length;
    //Categorias activas
    this.estadisticasCategorias.activas = categorias.filter(c => c.estado === 'activo').length;
    //Categorias inactivas
    this.estadisticasCategorias.inactivas = categorias.filter(c => c.estado === 'inactivo').length;
  }

  //Procesar cada uno de los contactos
  procesarContactos(contactos: any[]) {
    //Traigo la cantidad de mensajes
    this.estadisticasContactos.total = contactos.length;
    //Traigo el dato de cuales han sido atendidos y cuales no
    this.estadisticasContactos.atendidos = contactos.filter(c => c.estado === true || c.estado === 'true').length;
    this.estadisticasContactos.pendientes = contactos.filter(c => c.estado === false || c.estado === 'false').length;

    // Últimos 5 contactos
    this.estadisticasContactos.recientes = contactos
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 5);
  }

  //Cargo todos los datos en una misma variable 
  calcularResumen() {
    this.resumen = {
      productos: this.estadisticasProductos.total,
      categorias: this.estadisticasCategorias.total,
      pendientes: this.estadisticasContactos.pendientes
    };
  }

  //Metodo para calcular el porcentaje mas rapido
  obtenerPorcentaje(valor: number, total: number): number {
    return total > 0 ? Math.round((valor / total) * 100) : 0;
  }
}
