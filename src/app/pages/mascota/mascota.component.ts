import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MasterService } from 'src/app/services/master.service';
import { SanidadService } from 'src/app/services/sanidad.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css'],
})
export class MascotaComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any;
  dtTrigger: Subject<void> = new Subject<void>();
  dtOptions: any = {
    columnDefs: [
      { width: '2px', targets: 0 },
      { width: '200px', targets: 1 },
      { width: '100px', targets: 2 },
      { width: '600px', targets: 3 },
      { width: '70px', targets: 4 },
    ],
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        text: 'Exportar a Excel',
        filename: 'MASCOTA', // Nombre personalizado del archivo
      },
    ],
    lengthChange: false,
    searching: false,
    lengthMenu: [15],
    paging: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
    },
    responsive: false,
  };

  //Variables Globales
  dataAnimal: any;
  datosTipoSexo: any;
  datosTipoEspecie: any;
  datosTipoRaza: any;

  p_ani_id: number = 0;
  p_esr_id: number = 0;
  p_esp_id: number = 0;
  p_anr_id: number = 0;
  p_ans_id: number = 0;
  p_ani_nombre: string = '';
  p_esr_activo: number = 9;

  constructor(
    private appComponent: AppComponent,
    private serviceMaster: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private serviceSanidad: SanidadService,
    private sanidadService: SanidadService
  ) {
    this.appComponent.login = false;
  }

  ngOnInit(): void {
    this.ListarAnimal();
    this.especiesel();
    this.animalsexosel();
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

  ListarAnimal() {
    this.spinner.show();
    let data_post = {
      p_ani_id: this.p_ani_id,
      p_esr_id: this.p_esr_id,
      p_esp_id: this.p_esp_id,
      p_anr_id: this.p_anr_id,
      p_ans_id: this.p_ans_id,
      p_ani_nombre: this.p_ani_nombre.toUpperCase(),
      p_esr_activo: this.p_esr_activo,
    };

    this.sanidadService.animalsel(data_post).subscribe({
      next: (data: any) => {
        this.spinner.show();
        this.dataAnimal = data;
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

  especiesel() {
    let post = {
      p_esp_id: 0,
      p_esp_descri: '',
      p_esp_activo: 9,
    };
    this.sanidadService.especiesel(post).subscribe({
      next: (data: any) => {
        this.datosTipoEspecie = data;
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

  RoutesNavigateAnimalPropietario(ani_id : number) {
    this.router.navigate(["/animal/animal-propietario/" + ani_id]);
  }
}
