import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacto-page',
  standalone: false,
  templateUrl: './contacto-page.html',
  styleUrl: './contacto-page.scss',
})
export class ContactoPage {
   contactoForm!: FormGroup;
   enviado = false;

   constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
   }

   enviarMensaje(){
    if(this.contactoForm.valid){
      console.log('Mensaje enviado', this.contactoForm.value);
      this.enviado = true;
      this.contactoForm.reset();
    }else{
      this.contactoForm.markAllAsTouched();
    }
   }
}
