import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.scss']
})
export class AdministrativoComponent {
  reparaciones: any[] = [];
  reparacionesSeleccionadas: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.obtenerReparaciones();
  }


  obtenerReparaciones(): void {
    this.authService.obtenerReparaciones().subscribe(
      (reparaciones: any) => {
        this.reparaciones = reparaciones;
      },
      (error) => {
        console.error('Error al obtener las reparaciones', error);
      }
    );
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString();
  }

  generarFacturaPdf(): void {
    // Filtra las reparaciones seleccionadas
    const reparacionesSeleccionadas = this.reparaciones.filter(r => r.seleccionada);

    // Genera las facturas para las reparaciones seleccionadas
    reparacionesSeleccionadas.forEach(reparacion => {
      const imageUrl = 'assets/img/header/Logo.png'; // Ruta de la imagen

      // Obtener la imagen en formato base64
      this.getImageAsBase64(imageUrl).then(base64Data => {
        const fechaReparacion = this.formatFecha(reparacion.fecha_reparacion);
        const fechaMatriculacion = this.formatFecha(reparacion.id_maquina.ano_matriculacion);

        const documentDefinition: any = {
          content: [
            {
              columns: [
                { image: base64Data, width: 200, alignment: 'left' }, // Alinea la imagen a la izquierda
                { text: 'ESPATRACTOR.SL', style: 'companyName', alignment: 'right' } // Alinea el nombre de la empresa a la derecha
              ],
              margin: [0, 0, 0, 10] // Margen inferior entre la imagen y el nombre de la empresa
            },
            { text: 'Factura de Reparación', style: 'header' },
            { text: '-------------------------------------------' },
            {
              style: 'table',
              table: {
                widths: ['50%', '50%'],
                body: [
                  [
                    { text: 'Información de la Reparación', style: 'sectionHeader', margin: [0, 10, 0, 5] },
                    { text: 'Datos de la Máquina', style: 'sectionHeader', margin: [0, 10, 0, 5] }
                  ],
                  [
                    {
                      stack: [
                        { text: 'Número de Reparación:', bold: true },
                        { text: reparacion.n_reparacion, margin: [0, 5, 0, 5] },
                        { text: 'Fecha de Reparación:', bold: true },
                        { text: fechaReparacion, margin: [0, 5, 0, 5] },
                        { text: 'Referencia de la Máquina:', bold: true },
                        { text: reparacion.id_maquina.referencia, margin: [0, 5, 0, 5] },
                        { text: 'Descripción de la reparación:', bold: true },
                        { text: reparacion.descripcion_reparacion, margin: [0, 5, 0, 5] },
                      ]
                    },
                    {
                      stack: [
                        { text: 'Referencia:', bold: true },
                        { text: reparacion.id_maquina.referencia, margin: [0, 5, 0, 5] },
                        { text: 'Horas de Trabajo:', bold: true },
                        { text: reparacion.id_maquina.horas_trabajo, margin: [0, 5, 0, 5] },
                        { text: 'Kilómetros:', bold: true },
                        { text: reparacion.id_maquina.kilometros, margin: [0, 5, 0, 5] },
                        { text: 'Marca:', bold: true },
                        { text: reparacion.id_maquina.marca, margin: [0, 5, 0, 5] },
                        { text: 'Modelo:', bold: true },
                        { text: reparacion.id_maquina.modelo, margin: [0, 5, 0, 5] },
                        { text: 'Año de Matriculación:', bold: true },
                        { text: fechaMatriculacion, margin: [0, 5, 0, 5] },
                        { text: 'Tipo:', bold: true },
                        { text: reparacion.id_maquina.tipo, margin: [0, 5, 0, 5] }
                      ]
                    }
                  ]
                ]
              }
            },
            { text: 'Detalles de la Reparación', style: 'sectionHeader' },
            {
              style: 'table',
              table: {
                body: [
                  [
                    { text: 'Mano de Obra:', bold: true },
                    { text: reparacion.h_mano_de_obra + " horas", margin: [0, 5, 0, 5] }
                  ],
                  [
                    { text: 'Precio de Piezas:', bold: true },
                    { text: reparacion.precio_piezas + " €", margin: [0, 5, 0, 5] }
                  ],
                  [
                    { text: 'Total:', bold: true },
                    { text: reparacion.total + " €", margin: [0, 5, 0, 5] }
                  ]
                ]
              }
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 25]
            },
            sectionHeader: {
              fontSize: 14,
              bold: true,
              margin: [0, 10, 0, 5]
            },
            table: {
              margin: [0, 10, 0, 10]
            }
          }
        };
    
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.download('factura.pdf');
      });
    });
  }

  getImageAsBase64(imageUrl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(image, 0, 0);

          // Obtener los datos de la imagen en base64
          const base64Data = canvas.toDataURL('image/png');
          resolve(base64Data);
        } else {
          reject(new Error('No se pudo obtener el contexto del lienzo.'));
        }
      };
      image.onerror = reject;
      image.src = imageUrl;
    });
  }
}