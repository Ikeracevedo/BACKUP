import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-crear-categoria',
  standalone: false,
  templateUrl: './crear-categoria.html',
  styleUrl: './crear-categoria.scss',
})
export class CrearCategoria {

  //Para recibir la categoria a editar 
  @Input() categoriaEditar: any = null;
  @Input() modoEdicion: boolean = false;  
  //Para enviar datos al formulario padre
  @Output() onGuardar = new EventEmitter<any>();
  //Para notificar la cancelacion
  @Output() onCancelar = new EventEmitter<void>();
  //Estado local del formulario
  categoria = { nombre: '', descripcion: '', estado: 'Activo' };
  estadoActivo: boolean = true;


  ngOnChanges() {
    //Cuando el padre envia una categoria para editar, la traigo al formulario
    if(this.categoriaEditar){
      this.categoria = {
        nombre: this.categoriaEditar.nombre,
        descripcion: this.categoriaEditar.descripcion,
        estado: this.categoriaEditar.estado || 'Activo'
      };
      this.estadoActivo = this.categoria.estado === 'Activo';
    } else {
      //Si no hay categoria, se limpia el formulario
      this.limpiarFormulario();
    }
  }

  guardarCategoria(){
    if (!this.categoria.nombre.trim()) return;

    //Emite los datos al padre
    this.onGuardar.emit(this.categoria);
    this.limpiarFormulario()
  }

  cancelarEdicion() {
    //Notifica al padre que el procedimiento cancelo
    this.onCancelar.emit();
    this.limpiarFormulario();
  }

  limpiarFormulario(){
    this.categoria = {
      nombre: '',
      descripcion: '',
      estado:''
    }
  }

  //Metodo que me permite cambiar de estado entre activo e inactivo
  cambiarEstado() {
    this.categoria.estado = this.estadoActivo ? 'Activo' : 'Inactivo';
  }

}
