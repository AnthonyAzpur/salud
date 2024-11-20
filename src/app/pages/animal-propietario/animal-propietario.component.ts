import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MasterService } from 'src/app/services/master.service';
import { SanidadService } from 'src/app/services/sanidad.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { AnonymousSubject } from "rxjs/internal/Subject";

@Component({
  selector: 'app-animal-propietario',
  templateUrl: './animal-propietario.component.html',
  styleUrls: ['./animal-propietario.component.css']
})
export class AnimalPropietarioComponent implements OnInit {
  
  param_ani_id: string = "";

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {  
    columnDefs: [
      { width: '5px', targets: 0 },
      { width: '300px', targets: 1 },
      { width: '250px', targets: 2 },
      { width: '80px', targets: 3 },
    ],
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        text: 'Exportar a Excel',
        filename: 'PERSONA', // Nombre personalizado del archivo
      },
    ],
    lengthChange: false,
    searching: false,
    lengthMenu: [15], 
    paging: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    },
    responsive: false,
  }

  //Variables Globales
  dataPropietario:any;
  datosTipoDocumento: any;
  datosTipoGenero: any;
  datosPais:any;

  //Listado de Persona
  selectedPais:string='';

  p_esr_id:number=0;
  p_esp_id:number=0;
  p_anr_id:number=0;
  p_ans_id:number=0;
  p_ani_nombre:string='';
  p_esr_activo:number=9;
  dataAnimal:any;
  dataAnimalPropietario:any;
  dataPropietarioform:any;

  esp_descri:string='';
  anr_descri:string='';
  ans_descri:string='';
  ani_codigo:string='';
  ani_nombre:string='';
  ani_pesnet:string='';
  ani_canpat:string='';
  ani_tamalt:string='';
  ani_tamlar:string='';
  ani_numojo:string='';
  ani_edadan:string='';
  ani_estado:string='';
  ani_imgfot:string='';

  //Datos de Persona - Propietario
  p_per_id: number = 0;
  p_tdi_id: number = 1;
  p_ude_id: number = 15;
  p_upr_id: number = 128;
  p_tdi_numero: string = '';
  p_rec_apepat: string = '';
  p_rec_apemat: string = '';
  p_rec_nombre: string = '';
  p_tge_id: number = 0;
  p_rec_correo: string = '';
  p_rec_telfij: string = '';
  p_rec_telcel: string = '';
  p_pai_id: number = 179;
  p_udi_id: number = 1315;
  p_rec_direcc: string = '';
  p_etb_direcc: string = '';
  p_per_nombre: string = '';

  p_per_numdoi:string='';
  p_anp_fecini:string='';
  modalRef: BsModalRef | undefined;
  
  constructor(private appComponent: AppComponent
    , private serviceMaster: MasterService
    , private router: Router
    , private route: ActivatedRoute
    , private spinner: NgxSpinnerService
    , private sanidadService: SanidadService
    , private modalService: BsModalService) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.param_ani_id = this.route.snapshot.params['ani_id'];
    this.ListarAnimalPropietario();
    this.ListarAnimal();
    this.listarTipoDocumentoIdentidad();
    this.setTodayDate();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  descargaExcel() {
    let btnExcel = document.querySelector('#tablaAplicacion_wrapper .dt-buttons .dt-button.buttons-excel.buttons-html5') as HTMLButtonElement;
    btnExcel.click();
  }

  openModal(template: TemplateRef<any>, clase: string) {
    this.modalRef = this.modalService.show(template, { class: clase });
  }

  setTodayDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
  
    this.p_anp_fecini = formattedDate;
  }

  listarTipoDocumentoIdentidad() {
    let post = {
      p_tdi_id: 0,
      p_tpe_id: 1
    };
    this.serviceMaster.listarTipoDocumento(post).subscribe({
      next: (data: any) => {
        this.datosTipoDocumento = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ListarAnimalPropietario() {
    this.spinner.show();
    let data_post = {
      p_ani_id: this.param_ani_id,
      p_esr_id: this.p_esr_id,
    };

    this.sanidadService.ListarAnimalPropietario(data_post).subscribe({
      next: (data: any) => {
        this.spinner.show();
        this.dataAnimalPropietario = data;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ListarAnimal() {
    let data_post = {
      p_ani_id: this.param_ani_id,
      p_esr_id: this.p_esr_id,
      p_esp_id: this.p_esp_id,
      p_anr_id: this.p_anr_id,
      p_ans_id: this.p_ans_id,
      p_ani_nombre: this.p_ani_nombre,
      p_esr_activo: this.p_esr_activo,
    };

    this.sanidadService.animalsel(data_post).subscribe({
      next: (data: any) => {
        this.dataAnimal = data;
        console.log(this.dataAnimal);

        this.esp_descri = data[0].esp_descri;
        this.anr_descri = data[0].anr_descri;
        this.ans_descri = data[0].ans_descri;
        this.ani_codigo = data[0].ani_codigo;
        this.ani_nombre = data[0].ani_nombre.toUpperCase();
        this.ani_pesnet = data[0].ani_pesnet;
        this.ani_canpat = data[0].ani_canpat;
        this.ani_tamalt = data[0].ani_tamalt;
        this.ani_tamlar = data[0].ani_tamlar;
        this.ani_numojo = data[0].ani_numojo;
        this.ani_edadan = data[0].ani_edadan;
        this.ani_estado = data[0].ani_estado;
        this.ani_imgfot = 'http://172.17.1.56/files/salud/mascotas/'+data[0].ani_imgfot;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  buscarPropietario() {
    const data_post = {
      p_per_id     : 0,
      p_tdi_id     : this.p_tdi_id,
      p_per_numdoi : this.p_tdi_numero,
      p_per_nombre : '',
      p_prp_activo : 9,
    };

    this.sanidadService.listarPropietario(data_post).subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.p_per_id = data[0].per_id;
          this.p_per_nombre = data[0].per_nomcom;
        }else{
          this.p_per_id = 0;
          this.p_per_nombre = '';
          Swal.fire(data.mensa, 'No se encontraron resultados para la busqueda de propietario', 'error')
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  guardarRegistro(){
    if(this.p_per_id == 0){
      Swal.fire('Debe ingresar un Propietario', 'Vuelva a intentarlo', 'error');
    }else{
      let dataPost = {
        p_ani_id:this.param_ani_id,
        p_prp_id:this.p_per_id,
        p_anp_fecini:this.p_anp_fecini,
      };
      Swal.fire({
        title: '<b>Confirmación</b>',
        text: "¿Estás seguro de guardar la información?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.sanidadService.GuardarAnimalPropietario(dataPost).subscribe({
            next: (data: any) => {
              let result = data[0];
              if (result.hasOwnProperty('error')) {
                if (result.error === 0) {
                  Swal.fire({ title: '<h2>Confirmación</h2>', text: result.mensa, icon: 'success', confirmButtonText: 'Cerrar', confirmButtonColor: "#3085d6" }).then((result) => {
                    if (result.isConfirmed) {
                      this.CerrarModal();
                      window.location.reload();
                    }
                  });
                }else{
                  Swal.fire(result.mensa, 'Verifique los datos', 'error')
                }
              } else {
                Swal.fire('Ocurrió un error', 'Vuelva a intentarlo', 'error')
              }
            },
            error: (error: any) => {
              console.log(error);
            }
          });
        }
      })
    }
  }

  validarNumero(event: any): void {
    const keyCode = event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  CerrarModal(){
    this.modalRef?.hide();
  }
}