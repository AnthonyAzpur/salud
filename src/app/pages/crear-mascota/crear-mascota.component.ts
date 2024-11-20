import { Component, TemplateRef, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SanidadService } from 'src/app/services/sanidad.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadedImage } from 'ngx-image-cropper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
})
export class CrearMascotaComponent implements OnInit {
  //Variables para Modal
  modalRef: any = BsModalRef;

  imageChangedEvent: any = '';
  croppedImage: any = 'assets/images/avatardefault_pet.png';
  imageUrl: string | null = 'assets/images/avatardefault_pet.png';
  selectedFile: File | null = null;
  p_imgfot: string = '';
  textoimagenurl: any = 'assets/images/avatardefault_pet.png';
  imagenrecort: File | null = null;
  form!: FormGroup;

  //Var
  datosTipoEspecie: any;
  datosTipoSexo: any;
  datosTipoRaza: any;

  p_ani_id: number = 0;
  p_esp_id: number = 0;
  p_anr_id: number = 0;
  p_ans_id: number = 0;
  p_ani_nombre: string = '';
  p_ani_pesnet: string = '';
  p_ani_canpat: string = '';
  p_ani_tamalt: string = '';
  p_ani_tamlar: string = '';
  p_ani_numojo: string = '';
  p_ani_edadan: string = '';
  p_ani_muerto: number = 0;
  p_ani_esteri: number = 0;
  p_ani_imgfot: string = '';
  p_ani_codigo: string = '';
  nom_img_temp: string = '';

  anr_id: number = 0;
  confsimuerto: string = '';
  confsiesteri: string = '';
  // p_ani_tamalt: string = '';

  //Especie_Sel
  // p_esp_descri: string = '';
  // p_esp_activo: number = 9;

  //Functions

  constructor(
    private appComponent: AppComponent,
    private serviceMaster: MasterService,
    private router: Router,
    /* private fb: FormBuilder, */
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serviceSanidad: SanidadService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private sanidadService: SanidadService
  ) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.especiesel();
    this.animalsexosel();
  }
  
  ChangeMuerto(){
    console.log(this.p_ani_muerto);
    if (this.p_ani_muerto) {
      this.confsimuerto = 'SI';
    }else{
      this.confsimuerto = 'NO';
    }
  }
  
  ChangeEsteri(){
    console.log(this.p_ani_esteri);
    if (this.p_ani_esteri) {
      this.confsiesteri = 'SI';
    }else{
      this.confsiesteri = 'NO';
    }
  }

  GuardarMascota() {
    const dataPost = new FormData();
    if (this.imagenrecort) {

      var p_ani_id = this.p_ani_id;
      var p_esp_id = this.p_esp_id;
      var p_anr_id = this.p_anr_id;
      var p_ans_id = this.p_ans_id;
      var p_ani_nombre = this.p_ani_nombre.toUpperCase();
      var p_ani_pesnet = this.p_ani_pesnet;
      var p_ani_canpat = this.p_ani_canpat;
      var p_ani_tamalt = this.p_ani_tamalt;
      var p_ani_tamlar = this.p_ani_tamlar;
      var p_ani_numojo = this.p_ani_numojo;
      var p_ani_edadan = this.p_ani_edadan;
      var p_ani_muerto = this.p_ani_muerto;
      var p_ani_esteri = this.p_ani_esteri;
      var p_imgfot = this.p_imgfot;
      var p_ani_imgfot = this.p_ani_imgfot;

      var nom_img_temp = this.nom_img_temp;

      var p_ani_imgext = p_imgfot.slice(((p_imgfot.lastIndexOf(".") - 1) >>> 0) + 2);

      dataPost.append('p_ani_id', p_ani_id.toString());
      dataPost.append('p_esp_id', p_esp_id.toString());
      dataPost.append('p_anr_id', p_anr_id.toString());
      dataPost.append('p_ans_id', p_ans_id.toString());
      dataPost.append('p_ani_nombre', p_ani_nombre);
      dataPost.append('p_ani_pesnet', p_ani_pesnet.toString());
      dataPost.append('p_ani_canpat', p_ani_canpat.toString());
      dataPost.append('p_ani_tamalt', p_ani_tamalt.toString());
      dataPost.append('p_ani_tamlar', p_ani_tamlar.toString());
      dataPost.append('p_ani_numojo', p_ani_numojo.toString());
      dataPost.append('p_ani_edadan', p_ani_edadan.toString());
      dataPost.append('p_ani_muerto', p_ani_muerto.toString());
      dataPost.append('p_ani_esteri', p_ani_esteri.toString());
      dataPost.append('nom_img_temp','');
      dataPost.append('p_ani_imgfot_file[]', this.imagenrecort, this.imagenrecort.name);
      dataPost.append('p_ani_imgext',p_ani_imgext);

    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
    Swal.fire({
      title: '<b>Confirmación</b>',
      text: '¿Estás seguro de guardar la información?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sanidadService.animalreg(dataPost).subscribe({
          next: (data: any) => {
            let result = data[0];
            if (result.hasOwnProperty('error')) {
              if (result.error === 0) {
                
                Swal.fire({
                  title: '<h2>Confirmación</h2>',
                  text: result.mensa,
                  icon: 'success',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#3085d6',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.router.navigate(['mascota']);
                  }
                });
              } else {
                Swal.fire(result.mensa, 'Verifique los datos', 'error');
              }
            } else {
              Swal.fire('Ocurrió un error', 'Vuelva a intentarlo', 'error');
            }
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    });
  }

  especiesel() {
    let post = {
      p_esp_id: 0,
      p_esp_descri: '',
      p_esp_activo: 9,
    };
    this.sanidadService.especiesel(post).subscribe({
      next: (data: any) => {
        this.datosTipoEspecie = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  ListarRaza() {
    let post = {
      p_esp_id: this.p_esp_id,
      p_anr_id: 0,
      p_esr_activo: 9,
    };
    
    this.sanidadService.especierazasel(post).subscribe({
      next: (data: any) => {
        this.datosTipoRaza = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });

  }

  animalsexosel() {
    let post = {
      p_ans_id: 0,
      p_ans_descri: '',
      p_ans_activo: 9,
    };
    this.sanidadService.animalsexosel(post).subscribe({
      next: (data: any) => {
        this.datosTipoSexo = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  GuardarCambiosImagen() {
    this.imageUrl = this.croppedImage;
    this.cerrarModal();
  }

  openModal(template: TemplateRef<any>, clase: string) {
    this.modalRef = this.modalService.show(template, { class: clase });
  }

  cerrarModal() {
    this.modalRef?.hide();
  }

  onFileSelected(event: any): void {
    this.imageChangedEvent = event;
    const file: File = event.target.files[0];

    this.selectedFile = file;
    this.p_imgfot = this.selectedFile.name;
    var p_car_imgext = this.p_imgfot
      .slice(((this.p_imgfot.lastIndexOf('.') - 1) >>> 0) + 2)
      .toLocaleLowerCase();

    if (
      p_car_imgext == 'jpeg' ||
      p_car_imgext == 'png' ||
      p_car_imgext == 'jpg'
    ) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      document.getElementById('btnmodalimagen')?.click();
    } else {
      Swal.fire(
        'Solo se admite archivos con extensión jpeg , png o jpg',
        'Vuelva a intentarlo',
        'error'
      );

      const fileInput = document.getElementById(
        'fileimagenup'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Esto restablecerá el valor del input file
        this.imageUrl = this.textoimagenurl;
      }
    }
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  async getObjectUrlBlob(objectUrl: string): Promise<File> {
    const response = await fetch(objectUrl);
    const blob = await response.blob();

    // Puedes ajustar el nombre del archivo según tus necesidades
    const fileName = this.p_imgfot;

    // Crear un nuevo archivo con el Blob y el nombre
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  }

  dataURItoBlob(dataURI: string | undefined): Blob | null {
    if (!dataURI || typeof dataURI !== 'string') {
      console.error('dataURI no es válido:', dataURI);
      return null;
    }

    const commaIndex = dataURI.indexOf(',');
    if (commaIndex === -1) {
      console.error('dataURI no contiene una coma (,):', dataURI);
      return null;
    }

    const byteString = atob(dataURI.slice(commaIndex + 1));
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: 'image/png' });
  }

  imageCropped(event: any) {
    console.log(event);
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);

    this.getObjectUrlBlob(event.objectUrl)
      .then((file) => {
        // Manejar el archivo recortado como sea necesario
        this.imagenrecort = file;
        console.log('Archivo recortado:', this.imagenrecort);
      })
      .catch((error) => {
        console.error('Error al obtener el Blob:', error);
      });

    if (event.base64) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
        event.objectUrl
      );
      const fileBlob = this.dataURItoBlob(event.base64);
      if (fileBlob) {
        const file = new File([fileBlob], this.p_imgfot, { type: 'image/png' });
        /* this.selectedFile = file; */
        console.log('Archivo recortado:', file);
      } else {
        console.error('No se pudo convertir la imagen recortada a Blob.');
      }
    } else {
      console.error('base64 en event es undefined.');
    }
  }

  validarNumero(event: any): void {
    const keyCode = event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }
}
