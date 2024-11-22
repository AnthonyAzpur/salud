import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { PersonaComponent } from './pages/persona/persona.component';
import { CrearPersonaComponent } from './pages/crear-persona/crear-persona.component';
import { CrearCarneComponent } from './pages/crear-carne/crear-carne.component';
import { CrearCertificadoComponent } from './pages/crear-certificado/crear-certificado.component';
import { CarneComponent } from './pages/carne/carne.component';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { CrearMascotaComponent } from './pages/crear-mascota/crear-mascota.component';
import { PropietarioComponent } from './pages/propietario/propietario.component';
import { CrearPropietarioComponent } from './pages/crear-propietario/crear-propietario.component';
import { AnimalPropietarioComponent } from './pages/animal-propietario/animal-propietario.component';
import { DuplicarCarneComponent } from './pages/duplicar-carne/duplicar-carne.component';
import { DuplicarCertificadoComponent } from './pages/duplicar-certificado/duplicar-certificado.component';

export const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },  // No protegido, acceso sin autenticación
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'logout', component: LogoutComponent},   // Ruta no protegida
  { path: 'persona', component: PersonaComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'persona/crear-persona', component: CrearPersonaComponent, canActivate: [AuthGuard] },  // Ruta protegida

  { path: 'carne', component: CarneComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'carne/crear-carne', component: CrearCarneComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'carne/duplicar-carne/:tdi_id/:per_numdoi/:car_id', component: DuplicarCarneComponent, canActivate: [AuthGuard] },  // Ruta protegida

  { path: 'certificado', component: CertificadoComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'certificado/crear-certificado', component: CrearCertificadoComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'certificado/duplicar-certificado/:tdi_id/:per_numdoi/:cer_id', component: DuplicarCertificadoComponent, canActivate: [AuthGuard] },  // Ruta protegida

  { path: 'mascota', component: MascotaComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'mascota/crear-mascota', component: CrearMascotaComponent, canActivate: [AuthGuard] },  // Ruta protegida

  { path: 'propietario', component: PropietarioComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'propietario/crear-propietario', component: CrearPropietarioComponent, canActivate: [AuthGuard] },  // Ruta protegida
  { path: 'animal/animal-propietario/:ani_id', component: AnimalPropietarioComponent, canActivate: [AuthGuard] },  // Ruta protegida

  { path: '', pathMatch: 'full', redirectTo: 'login' },  // Redirige a login si no se encuentra la ruta
  { path: '**', pathMatch: 'full', redirectTo: 'login' },  // Redirige a login si la ruta no coincide
];
