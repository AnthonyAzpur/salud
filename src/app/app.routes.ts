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
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'persona', component: PersonaComponent },
  { path: 'persona/crear-persona', component: CrearPersonaComponent },

  { path: 'carne', component: CarneComponent },
  { path: 'carne/crear-carne', component: CrearCarneComponent },
  { path: 'carne/duplicar-carne/:tdi_id/:per_numdoi/:car_id', component: DuplicarCarneComponent },

  { path: 'certificado', component: CertificadoComponent },
  { path: 'certificado/crear-certificado',component: CrearCertificadoComponent,},
  { path: 'certificado/duplicar-certificado/:tdi_id/:per_numdoi/:cer_id', component: DuplicarCertificadoComponent },

  { path: 'mascota', component: MascotaComponent },
  { path: 'mascota/crear-mascota', component: CrearMascotaComponent },
  { path: 'propietario', component: PropietarioComponent },
  { path: 'propietario/crear-propietario', component: CrearPropietarioComponent },
  { path: 'animal/animal-propietario/:ani_id', component: AnimalPropietarioComponent },

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
