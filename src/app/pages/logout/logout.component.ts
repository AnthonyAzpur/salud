import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Elimina la información de sesión al cerrar sesión
    this.logoutUser();
  }

  // Método que elimina los datos del localStorage y redirige al login
  logoutUser(): void {
    // Elimina los datos de sesión del localStorage
    localStorage.removeItem('session-dashboard');
    localStorage.removeItem('usu_id');
    localStorage.removeItem('usu_nombre');
    localStorage.removeItem('usu_apepat');
    localStorage.removeItem('usu_apemat');

    // Redirige al usuario al login
    this.router.navigate(['/login']);
  }
}
