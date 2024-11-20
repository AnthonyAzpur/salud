import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, firstValueFrom } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root',
})
export class SanidadService {
  constructor(private httpClientUtils: HttpClientUtils) {}

  listarRecurrente(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/recurrente/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  listarPropietario(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/propietariosel', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  guardarRecurrente(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/recurrente/registrar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  guardarPropietario(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/propietarioreg', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarOcupacion(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/ocupacion/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarGiro(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/actividad/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  ListarCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/certificado/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarRubro(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/actividad/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  detextaqrbase(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/detextaqrbase', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  firmasel(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/firma', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarEstablecimiento(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/establecimiento/listar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  listarCarne(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/listar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  
  listarEstadodocSel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/estadodocsel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  guardarEstadodoc(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/guardarEstadodoc', data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  
  guardarEstadocertificadodoc(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/guardarEstadocertificadodoc', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  guardarCarne(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/guardar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  
  renovarCarne(data: any) {
    return this.httpClientUtils.postQuery('sanidad/carne/renovar', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  guardarCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/certificado/guardar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  renovarCertificado(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/certificado/renovar', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  //EXTRAS
  DeImagenURLaBase64(data: any) {
    return this.httpClientUtils
      .postQuery('sanidad/deimagenurlabase64', data)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  //MASCOTAS

  animalreg(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalreg', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  animalsel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalsel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  especiesel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/especiesel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  animalsexosel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalsexosel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }

  especierazasel(data: any) {
    return this.httpClientUtils.postQuery('sanidad/especierazasel', data).pipe(
      map((data) => {
        return data;
      })
    );
  }
  BuscarRecibo(data: any) {
    return this.httpClientUtils.postQuery('sanidad/apirecibosel', data).pipe(
        map(data => {
            return data;
        })
    );
  }

  AnularCarnet(data: any) {
    return this.httpClientUtils.postQuery('sanidad/AnularCarnet', data).pipe(
        map(data => {
            return data;
        })
    );
  }
  
  ListarAnimalPropietario(data: any) {
    return this.httpClientUtils.postQuery('sanidad/ListarAnimalPropietario', data).pipe(
        map(data => {
            return data;
        })
    );
  }
  
  GuardarAnimalPropietario(data: any) {
    return this.httpClientUtils.postQuery('sanidad/animalpropietarioreg', data).pipe(
        map(data => {
            return data;
        })
    );
  }

  AnularCertificado(data: any) {
    return this.httpClientUtils.postQuery('sanidad/AnularCertificado', data).pipe(
        map(data => {
            return data;
        })
    );
  }

  SendCorreoCarnet(data: any) {
    return this.httpClientUtils.postQuery('sanidad/ProcesoEnvioCorreoCarnet', data).pipe(
        map(data => {
            return data;
        })
    );
  }

  SendCorreoCertificado(data: any) {
    return this.httpClientUtils.postQuery('sanidad/ProcesoEnvioCorreoCertificado', data).pipe(
        map(data => {
            return data;
        })
    );
  }
  
  getusuariosel(data: object) {
    return this.httpClientUtils.postQuery("sanidad/listarUsuario", data).pipe(
      map((data) => {
        return data;
      })
    );
  }

}
