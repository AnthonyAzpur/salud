import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { AuthService } from 'src/app/services/auth.service';
import { SanidadService } from 'src/app/services/sanidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private appComponent: AppComponent,
    private auth: AuthService,
    private toastComponent: ToastComponent,
    private serviceSanidad: SanidadService
  ) {
    this.appComponent.login = true; // Asegurarse de que el login esté activo
  }

  ngOnInit(): void {}

  loginUser(): void {
    let btnLogin = document.getElementById('btnLoginAction') as HTMLButtonElement;
    btnLogin.innerHTML = '<span class="align-items-center"><span class="spinner-border flex-shrink-0" role="status"><span class="visually-hidden">Loading...</span></span><span class="flex-grow-1 ms-2">Ingresando...</span></span>';
    btnLogin.classList.add('pe-none', 'btn-load'); // Desactivar el botón mientras carga

    const data = {
      p_app_id: 7,
      p_loging: this.username,
      p_passwd: this.password
    };

    // Realizar la solicitud de inicio de sesión
    this.auth.postGetLoginUser(data).subscribe({
      next: (result: any) => {
        if (result[0].error === 0) {
          this.toastComponent.showToast('Inicio de sesión correcto.', 'success');

          // Almacenar el numid del usuario (token de sesión) y datos
          const numid = result[0].numid.toString();
          localStorage.setItem('session-dashboard', numid); // Guarda el ID único para la sesión
          localStorage.setItem('usu_id', numid);  // Guarda el identificador único

          // Obtener más datos del usuario
          const data_post = {
            p_usu_id: parseInt(numid),
            p_usu_apepat: '',
            p_usu_apemat: '',
            p_usu_nombre: '',
            p_usu_loging: ''
          };

          // Solicitar datos adicionales del usuario
          this.serviceSanidad.getusuariosel(data_post).subscribe((data: any) => {
            localStorage.setItem("usu_apemat", data[0].usu_apemat);
            localStorage.setItem("usu_apepat", data[0].usu_apepat);
            localStorage.setItem("usu_nombre", data[0].usu_nombre);
            localStorage.setItem("usu_nomcom", data[0].usu_nomcom);
          });

          // Redirigir a la ruta principal después de iniciar sesión
          setTimeout(() => {
            btnLogin.innerHTML = 'Ingresar'; // Restaurar el texto del botón
            btnLogin.classList.remove('pe-none', 'btn-load'); // Restaurar estado del botón
            this.router.navigate(['/dashboard']); // Redirigir a la ruta protegida
          }, 2000);

        } else {
          btnLogin.innerHTML = 'Ingresar';
          btnLogin.classList.remove('pe-none', 'btn-load');
          this.toastComponent.showToast(result[0].mensa, 'info');
        }
      },
      error: (error: any) => {
        console.error(error);
        btnLogin.innerHTML = 'Ingresar';
        btnLogin.classList.remove('pe-none', 'btn-load');
        this.toastComponent.showToast('Error al iniciar sesión, inténtalo nuevamente.', 'danger');
      }
    });
  }

  togglePassword(): void {
    let passwordInput = document.getElementById('password-input') as HTMLInputElement;
    let passwordIcon = document.getElementById('passwordEye') as HTMLSpanElement;

    // Alternar entre mostrar/ocultar la contraseña
    if (passwordIcon.classList.contains('ri-eye-fill')) {
      passwordInput.type = 'text'; // Mostrar la contraseña
      passwordIcon.classList.remove('ri-eye-fill');
      passwordIcon.classList.add('ri-eye-off-fill');
    } else {
      passwordInput.type = 'password'; // Ocultar la contraseña
      passwordIcon.classList.remove('ri-eye-off-fill');
      passwordIcon.classList.add('ri-eye-fill');
    }
  }

  goToPage(page: any): void {
    this.router.navigate([page]);
  }
}
