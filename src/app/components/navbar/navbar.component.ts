import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para manejar la navegación

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Variables para almacenar datos del usuario
  usu_apemat: string | null = "";
  usu_apepat: string | null = "";
  usu_id: string | null = "";
  usu_loging: string | null = "";
  usu_nombre: string | null = "";
  usu_nomcom: string | null = "";

  layoutModeIcon: string = 'sun'; // Icono para el tema (modo claro/oscuro)
  dataEmpresas: any = []; // Datos de empresas si se necesitan

  // Inyectar el Router en el constructor para poder usarlo
  constructor(private router: Router) { }

  ngOnInit() {
    this.getdataUsuario(); // Obtener los datos del usuario

    // Verificar si el usuario está autenticado
    if (!this.usu_id) {
      this.router.navigate(['/login']); // Si no está autenticado, redirigir al login
    }

    // Aplicar el tema guardado en localStorage
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.changeLayoutMode(theme); // Aplicar el tema guardado
    }
  }
  

  // Método que elimina los datos de la sesión y redirige al login
  delDatosSession() {
    // Eliminar los datos de sesión del localStorage
    localStorage.removeItem("usu_apemat");
    localStorage.removeItem("usu_apepat");
    localStorage.removeItem("usu_id");
    localStorage.removeItem("usu_loging");
    localStorage.removeItem("usu_nombre");
    localStorage.removeItem("usu_nomcom");
    localStorage.removeItem('session-dashboard');

    // Redirigir al login usando Angular Router
    this.router.navigate(['/login']);
  }

  // Método para obtener los datos del usuario desde localStorage
  getdataUsuario() {
    this.usu_apemat = localStorage.getItem("usu_apemat");
    this.usu_apepat = localStorage.getItem("usu_apepat");
    this.usu_id = localStorage.getItem("usu_id");
    this.usu_loging = localStorage.getItem("usu_loging");
    this.usu_nombre = localStorage.getItem("usu_nombre");
    this.usu_nomcom = localStorage.getItem("usu_nomcom");
  }

  // Método para cambiar el tema de la interfaz (modo claro/oscuro)
  changeLayoutMode(mode: string) {
    let htmlSelector = document.getElementsByTagName('html')[0];
    let tableSelector = document.querySelectorAll('thead, tfoot');

    if (mode === 'light') {
      htmlSelector.setAttribute('data-topbar', 'light');
      htmlSelector.setAttribute('data-sidebar', 'light');
      htmlSelector.setAttribute('data-bs-theme', 'light');

      tableSelector.forEach(element => {
        element.classList.remove('table-dark');
        element.classList.add('table-light');
      });

      this.layoutModeIcon = 'sun';
      localStorage.setItem('theme', 'light'); // Guardar la preferencia de tema
    } else {
      htmlSelector.setAttribute('data-topbar', 'dark');
      htmlSelector.setAttribute('data-sidebar', 'dark');
      htmlSelector.setAttribute('data-bs-theme', 'dark');

      tableSelector.forEach(element => {
        element.classList.remove('table-light');
        element.classList.add('table-dark');
      });

      this.layoutModeIcon = 'moon';
      localStorage.setItem('theme', 'dark'); // Guardar la preferencia de tema
    }
  }
}
