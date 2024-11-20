import { Component, OnInit, ViewChild, ElementRef , TemplateRef,EventEmitter,Input,Output } from '@angular/core';
import * as QRCode from 'qrcode-generator';
import { SanidadService } from 'src/app/services/sanidad.service';

@Component({
  selector: 'app-modalcertificado',
  templateUrl: './modalcertificado.component.html',
  styleUrls: ['./modalcertificado.component.css']
})
export class ModalcertificadoComponent implements OnInit {
  //IMPLEMENTACIÓN DE VARIABLES ENTRADAS - SALIDAS
  @ViewChild('contenidoDiv', { static: false }) contenidoDiv!: ElementRef;
  @Input() inputPersona : any;;
  @Output() confirmClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();
  firma:string='';

  constructor(private serviceSanidad: SanidadService) {}

  ngOnInit(): void {
    this.GetFirma();
    this.GetQrLink();
    console.log(this.inputPersona);
  }

  GetFirma(){
    let post = {
      p_fir_fecbus: this.inputPersona['cer_fecemi']
    };
    this.serviceSanidad.firmasel(post).subscribe({
      next: (data: any) => {
        this.firma = data[0]['fir_nomfil'];
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  GetQrLink(){
    let post = {
      ruta_qr: this.inputPersona['cer_rutaqr'],
    };
    this.serviceSanidad.detextaqrbase(post).subscribe({
      next: (data: any) => {
        var imageElement = document.getElementById('image_principaltxtconsultar');
        if (imageElement !== null) {
            imageElement.innerHTML = '';
            imageElement.setAttribute('style', 'padding: 0px;width: 85%;margin-top: -12px;border-style: groove;');
            const elem_img = document.createElement('img');
            elem_img.setAttribute('src', 'data:image/svg+xml;base64,' + data['codigo_qr_base64']);
            elem_img.setAttribute('style', 'width:100%;height:auto;');
            imageElement.appendChild(elem_img);
        } else {
            console.error("No se encontró ningún elemento con el ID 'image_principaltxtconsultar'");
        }

      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  convertirAPDF() {
    
    const contenidoDiv = this.contenidoDiv.nativeElement.innerHTML;
    const ventanaImpresion = window.open('', '', 'width=1024 ,height=640');
    ventanaImpresion?.document.write('<html><head><title>Imprimir</title></head><body>');
    ventanaImpresion?.document.write(contenidoDiv);
    ventanaImpresion?.document.write('</body></html>');
    ventanaImpresion?.document.close();
    setTimeout(() => {
      ventanaImpresion?.print();
    }, 2000);

    /* const content: HTMLDivElement | null = this.contenidoDiv.nativeElement;
 
    if (content) {
       // Esperar a que todas las imágenes se carguen
       Promise.all(Array.from(content.querySelectorAll('img')).map(img => img.complete)).then(() => {
          const ventanaImpresion = window.open('', '');
          ventanaImpresion?.document.write(content.innerHTML);
          ventanaImpresion?.document.close();
 
          // Comprobación de nulabilidad antes de intentar asignar a onafterprint
          if (ventanaImpresion?.onafterprint) {
            ventanaImpresion.onafterprint = () => {
              ventanaImpresion?.close();
            };
          } else {
            console.error('La propiedad onafterprint no está definida en la ventana de impresión.');
          }

          ventanaImpresion?.print();
       });
    } else {
       console.error('No se encontró el elemento con el ID "contenido-a-convertir".');
    } */
 }

}
