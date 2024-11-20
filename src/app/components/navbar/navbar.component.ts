import { Component, OnInit } from '@angular/core';
// import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usu_apemat: string | null = "";
  usu_apepat: string | null = "";
  usu_id: string | null = "";
  usu_loging: string | null = "";
  usu_nombre: string | null = "";
  usu_nomcom: string | null = "";

  layoutModeIcon: string = 'sun';
  dataEmpresas: any = [];

  constructor() { }

  ngOnInit(){
    this.getdataUsuario();
  }

  delDatosSession() {
    localStorage.removeItem("usu_apemat");
    localStorage.removeItem("usu_apepat");
    localStorage.removeItem("usu_id");
    localStorage.removeItem("usu_loging");
    localStorage.removeItem("usu_nombre");
    localStorage.removeItem("usu_nomcom");

    window.location.href = "login";
  }
  
  getdataUsuario() {
    this.usu_apemat = localStorage.getItem("usu_apemat");
    this.usu_apepat = localStorage.getItem("usu_apepat");
    this.usu_id = localStorage.getItem("usu_id");
    this.usu_loging = localStorage.getItem("usu_loging");
    this.usu_nombre = localStorage.getItem("usu_nombre");
    this.usu_nomcom = localStorage.getItem("usu_nomcom");
  }

  changeLayoutMode(mode: string){
    let htmlSelector = document.getElementsByTagName('html')[0];
    let tableSelector = document.querySelectorAll('thead, tfoot');

    if(mode == 'light'){
      htmlSelector.setAttribute('data-topbar', 'light');
      htmlSelector.setAttribute('data-sidebar', 'light');
      htmlSelector.setAttribute('data-bs-theme', 'light');

      tableSelector.forEach(element => {
        element.classList.remove('table-dark');
        element.classList.add('table-light');
      });

      this.layoutModeIcon = 'sun';
    }else{
      htmlSelector.setAttribute('data-topbar', 'dark');
      htmlSelector.setAttribute('data-sidebar', 'dark');
      htmlSelector.setAttribute('data-bs-theme', 'dark');

      tableSelector.forEach(element => {
        element.classList.remove('table-light');
        element.classList.add('table-dark');
      });

      this.layoutModeIcon = 'moon';
    }
  }

  // companyList(){
  //   this.dataEmpresas = [];

  //   let data = {
  //     p_com_id: 0
  //   }

  //   this.administracionService.postGetCompanyList(data).subscribe({
  //     next: (result: any) => {
  //       console.log(result);
  //       this.dataEmpresas = result;
  //     },
  //     error: (error: any) => {
  //       console.error(error);
  //     }
  //   });
  // }

  setDefaultCompany(id: number){

  }

}
