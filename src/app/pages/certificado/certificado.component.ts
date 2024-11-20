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

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  modalRef!: BsModalRef;
  @ViewChild('contenidoDiv', { static: false }) contenidoDiv!: ElementRef;
  @ViewChild(DataTableDirective, { static: false }) dataTable!: DataTableDirective;
  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;

  /* dtElement: any; */
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {
    columnDefs: [
      { width: '5px', targets: 0 },
      { width: '5px', targets: 1 },
      { width: '200px', targets: 2 },
      { width: '50px', targets: 3 },
      { width: '140px', targets: 4 },
      { width: '50px', targets: 5 },
      { width: '50px', targets: 6 },
      { width: '50px', targets: 7 },
      { width: '50px', targets: 8 },
      { width: '50px', targets: 9 },
      { width: '5px', targets: 10 },
    ],
    lengthChange: false,
    searching: false,
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        text: 'Exportar a Excel',
        filename: 'CERTIFICADO', // Nombre personalizado del archivo
      },
    ],
    lengthMenu: [15],
    paging: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
    },
    responsive: false,
  }

  dataprueba: any;
  dataChangeStado: any;
  datosEstadodoc: any;
  estadodocer_id: number = 0;

  //Variables Globales
  dataCertificado: any;
  datosTipoDocumento: any;
  datosGiro: any;
  datosOcupacion: any;

  carneimg: string = '';
  p_mensaload: string = 'Buscando información...';

  //Listado de Persona
  selectedPais: string = '';

  p_cer_id:number = 0;
  dp_estadoc: number = 0;
  p_tdi_id:number = 1;
  p_per_numdoi:string = '';
  p_act_id:string='';
  p_ocu_id:string='';
  p_emp_id:number = 0;
  p_cer_numero:number=0;
  p_cer_fecini:string='';
  p_cer_fecfin:string='';
  p_cer_activo:number=9;
  observ: string = '';

  //Resultados
  p_ruc: string = '';
  p_razon_social:string='';

  constructor(private modalService: BsModalService, private appComponent: AppComponent
    , private serviceMaster: MasterService
    , private router: Router
    , private route: ActivatedRoute
    , private spinner: NgxSpinnerService
    , private serviceSanidad: SanidadService) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.setTodayDate();
    this.ListarCertificado();
    this.listarTipoDocumentoIdentidad();
    this.listarGiro();
    this.listarOcupacion();
    this.listarEstadodocSel();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    console.log(this.dataTable);
    console.log(this.contenidoDiv);
  }

  setTodayDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
  
    this.p_cer_fecini = formattedDate;
    this.p_cer_fecfin = formattedDate;
  }

  descargaExcel() {
    let btnExcel = document.querySelector('#tablaAplicacion_wrapper .dt-buttons .dt-button.buttons-excel.buttons-html5') as HTMLButtonElement;
    btnExcel.click();
  }

  openModalWithEstado(template: TemplateRef<any>,data:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.dataChangeStado = data;
    this.estadodocer_id = data.cer_id;
  }

  openModalWithClass(template: TemplateRef<any>,data:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.dataprueba = data;
  }

  buscarPersonaJuridica() {
    let post = {
      p_per_id: 0,
      p_tdi_id: 2,
      p_per_numdoi: this.p_ruc
    };

    this.serviceMaster.ListarPersona(post).subscribe({
      next: (data: any) => {
        if (Object.keys(data).length > 0) {
          this.spinner.show();
          let result = data[0];
          this.p_emp_id = result['per_id'];
          this.p_razon_social = data[0]['per_nombre'];
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No encontramos a la empresa con el RUC ingresado",
          });
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.spinner.hide();
  }

  listarEstadodocSel() {
    let post = {};
    this.serviceSanidad.listarEstadodocSel(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datosEstadodoc = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ListarCertificado() {
    this.spinner.show();
    const data_post = {
      p_cer_id:this.p_cer_id,
      p_tdi_id:this.p_tdi_id,
      p_per_numdoi:this.p_per_numdoi,
      p_act_id:this.p_act_id,
      p_ocu_id:this.p_ocu_id,
      p_emp_id:this.p_emp_id,
      p_cer_numero:this.p_cer_numero,
      p_cer_fecini:this.p_cer_fecini,
      p_cer_fecfin:this.p_cer_fecfin,
      p_cer_activo:this.p_cer_activo
    };

    this.serviceSanidad.ListarCertificado(data_post).subscribe({
      next: (data: any) => {
        this.dataCertificado = data;
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

  listarGiro() {
    let post = {};
    this.serviceSanidad.listarGiro(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datosGiro = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  listarOcupacion() {
    let post = {};
    this.serviceSanidad.listarOcupacion(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.datosOcupacion = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  DeImagenURLaBase64(nomfile: string) {
    let post = {
      ruta: nomfile
    };

    this.serviceSanidad.DeImagenURLaBase64(post).subscribe({
      next: (data: any) => {
        console.log(data);
        this.carneimg = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  convertirAPDF() {
    const content: HTMLDivElement | null = this.contenidoDiv.nativeElement;

    if (content) {
      const ventanaImpresion = window.open('', '_blank');
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
    } else {
      console.error('No se encontró el elemento con el ID "contenido-a-convertir".');
    }
  }

  SendCorreoCertificado(data:any){
    var p_cer_id = data.cer_id;
    var p_pec_correo = data.pec_correo;
    this.p_mensaload = 'Enviando correo ...';

    const data_post = {
      p_cer_id: p_cer_id,
    };

    Swal.fire({
      title: '<b>Confirmación</b>',
      text: "¿Estás seguro de enviar el archivo al correo "+ p_pec_correo +"?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
          this.serviceSanidad.SendCorreoCertificado(data_post).subscribe({
            next: (data: any) => {
              console.log(data);
              if (data.res_cod == '000') {
                Swal.fire({ title: '<h2>Confirmación</h2>', text: 'Certificado enviado correctamente al correo '+p_pec_correo, icon: 'success', confirmButtonText: 'Cerrar', confirmButtonColor: "#3085d6" }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }else{
                Swal.fire('Error al enviar Correo', 'Verifique los datos', 'error')
              }
              this.spinner.hide();
              this.p_mensaload = 'Buscando información...';
            },
            error: (error: any) => {
              console.log(error);
            }
          });
      }
    })    
  }

  AnularCertificado(cer_id:number){
    const data_post = {
      p_cer_id: cer_id,
    };

    Swal.fire({
      title: '<b>Confirmación</b>',
      text: "¿Estás seguro de Anular el Certificado?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.serviceSanidad.AnularCertificado(data_post).subscribe({
            next: (data: any) => {
              if (data[0].error == 0) {
                Swal.fire({ title: '<h2>Confirmación</h2>', text: data[0].mensa, icon: 'success', confirmButtonText: 'Cerrar', confirmButtonColor: "#3085d6" }).then((data) => {
                  if (data.isConfirmed) {
                    window.location.reload();
                  }
                });
              }else{
                Swal.fire(data.mensa, 'Verifique los datos', 'error')
              }
            },
            error: (error: any) => {
              console.log(error);
            }
          });
      }
    })
  }

  validarNumero(event: any): void {
    const keyCode = event.keyCode;
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  CambiarEstado(){
    const data_post = {
      p_cer_id: this.estadodocer_id,
      p_esd_id: this.dp_estadoc,
      p_esd_observ: this.observ,
    };
    this.serviceSanidad.guardarEstadocertificadodoc(data_post).subscribe((data: any) => {
      if(data[0].error == 0){
        Swal.fire({
          title: 'Exito',
          text: data[0].mensa.trim(),
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.value) {
            setTimeout(() => {
              const closeModalButton = document.getElementById('closeModal');
              if (closeModalButton !== null) {
                  closeModalButton.click();
              }

              if (this.dp_estadoc==1) {
                this.SendCorreoCertificado(this.dataChangeStado);
              }else if(this.dp_estadoc==2){
                window.location.reload();
              }
            }, 500);
          }
        });
      }else{
          Swal.fire({
            title: 'Error',
            text: data[0].mensa.trim(),
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          });
      }
    });
  }
  
  RoutesNavigateDuplicarCertificado(tdi_id : number,per_numdoi : number,car_id : number) {
    this.router.navigate(["/certificado/duplicar-certificado/" + tdi_id +"/"+ per_numdoi+"/"+ car_id]);
  }
}
