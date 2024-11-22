import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica si el token está presente en localStorage.
    const token = localStorage.getItem('session-dashboard');  // El valor correcto debe ser 'session-dashboard'
    console.log('Token encontrado:', token);

    if (token) {
      return true;  // Si el token existe, el usuario puede acceder a la ruta
    } else {
      console.log("Eror69")
      // Si no hay token, se muestra una alerta y redirige al login
      Swal.fire({
        text: 'Debes iniciar sesión para acceder a esta página.',
        icon: 'warning',
        confirmButtonColor: '#EA535A',
        color: '#FFFFFF',
        confirmButtonText: 'Ir a Login',
      }).then(() => {
        // Redirige al login tras cerrar la alerta
        this.router.navigateByUrl('/login');
      });
      return false;  // No permite el acceso
    }
  }
}
