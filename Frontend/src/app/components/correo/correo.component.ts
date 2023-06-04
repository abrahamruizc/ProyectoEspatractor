import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      contenido: ['', Validators.required]
    });

  }

  ngOnInit(): void { }

  submitFormulario() {
    if (this.formulario.invalid) {
      return;
    }


    const formData = this.formulario.value;

    console.log(formData);
    
    const cuerpo = {
      correo: formData.correo,
      asunto: formData.asunto,
      contenido: formData.contenido
    }
  

    this.auth.enviarCorreo(cuerpo).subscribe(
      () => {
        console.log('Correo enviado correctamente');
        // Realiza las acciones necesarias después de enviar el correo
      },
      error => {
        console.error('Error al enviar el correo', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    );


  }

}