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
  selector: 'app-carne',
  templateUrl: './carne.component.html',
  styleUrls: ['./carne.component.css']
})
export class CarneComponent implements OnInit {
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
      { width: '250px', targets: 2 },
      { width: '100px', targets: 3 },
      { width: '100px', targets: 4 },
      { width: '100px', targets: 5 },
      { width: '100px', targets: 6 },
      { width: '100px', targets: 7 },
      { width: '100px', targets: 8 },
      { width: '100px', targets: 9 },
      { width: '5px', targets: 10 },
    ],
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        text: 'Exportar a Excel',
        filename: 'CARNET', // Nombre personalizado del archivo
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

  dataprueba: any;
  dataChangeStado: any;

  //Variables Globales
  dataCarnet: any;
  datosTipoDocumento: any;
  datosGiro: any;
  datosOcupacion: any;
  datosEstadodoc: any;

  carneimg: string = '';

  //Listado de Persona
  selectedPais: string = '';

  p_car_id: number = 0;
  dp_estadoc: number = 0;
  p_tdi_id: number = 1;
  estadodocar_id: number = 0;
  p_per_numdoi: string = '';
  p_act_id: string = '';
  p_ocu_id: string = '';
  p_car_numero: number = 0;
  p_car_fecini: string = '';
  p_car_fecfin: string = '';
  p_car_activo: string = '';
  observ: string = '';

  p_mensaload: string = 'Buscando información...';

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
    this.ListarCarne();
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

    this.p_car_fecini = formattedDate;
    this.p_car_fecfin = formattedDate;
  }

  descargaExcel() {
    let btnExcel = document.querySelector('#tablaAplicacion_wrapper .dt-buttons .dt-button.buttons-excel.buttons-html5') as HTMLButtonElement;
    btnExcel.click();
  }

  openModalWithClass(template: TemplateRef<any>,data:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.dataprueba = data;
  }

  openModalWithEstado(template: TemplateRef<any>,data:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    this.dataChangeStado = data;
    this.estadodocar_id = data.car_id;
  }

  ListarCarne() {
    this.spinner.show();
    const data_post = {
      p_car_id: this.p_car_id,
      p_tdi_id: this.p_tdi_id,
      p_per_numdoi: this.p_per_numdoi,
      p_act_id: this.p_act_id,
      p_ocu_id: this.p_ocu_id,
      p_car_numero: this.p_car_numero,
      p_car_fecini: this.p_car_fecini,
      p_car_fecfin: this.p_car_fecfin,
      p_car_activo: this.p_car_activo,
    };

    this.serviceSanidad.listarCarne(data_post).subscribe({
      next: (data: any) => {
        this.dataCarnet = data;
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
      setTimeout(() => {
        ventanaImpresion?.print();
      }, 1000);
    } else {
      console.error('No se encontró el elemento con el ID "contenido-a-convertir".');
    }
  }

  SendCorreoCarnet(data:any){
    var p_car_id = data.car_id;
    var p_car_correo = data.car_correo;
    this.p_mensaload = 'Enviando correo ...';

    const data_post = {
      p_car_id: p_car_id,
    };

    Swal.fire({
      title: '<b>Confirmación</b>',
      text: "¿Estás seguro de enviar el archivo al correo "+ p_car_correo +"?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
          this.serviceSanidad.SendCorreoCarnet(data_post).subscribe({
            next: (data: any) => {
              console.log(data);
              if (data.res_cod == '000') {
                Swal.fire({ title: '<h2>Confirmación</h2>', text: 'Carnet enviado correctamente al correo '+p_car_correo, icon: 'success', confirmButtonText: 'Cerrar', confirmButtonColor: "#3085d6" }).then((result) => {
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

  AnularCarnet(car_id:number){

    const data_post = {
      p_car_id: car_id,
    };

    Swal.fire({
      title: '<b>Confirmación</b>',
      text: "¿Estás seguro de Anular el Carnet?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
          this.serviceSanidad.AnularCarnet(data_post).subscribe({
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
      p_car_id: this.estadodocar_id,
      p_esd_id: this.dp_estadoc,
      p_esd_observ: this.observ,
    };
    this.serviceSanidad.guardarEstadodoc(data_post).subscribe((data: any) => {
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
                this.SendCorreoCarnet(this.dataChangeStado);
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

  RoutesNavigateDuplicarCarne(tdi_id : number,per_numdoi : number,car_id : number) {
    this.router.navigate(["/carne/duplicar-carne/" + tdi_id +"/"+ per_numdoi+"/"+ car_id]);
  }

}
