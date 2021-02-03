import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from './../models/usuario.model';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;
  public user: Usuario;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }
  
  get headers() {
    const token = localStorage.getItem('token') || '';
    return  {
      headers: {
        'x-token': token
      }
    }
  }

  get uid(){
    return this.user.uid;
  }

  googleInit() {
    return new Promise(resolve => {
      console.log('gapi=>',gapi)
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '413358598755-eoqsmmaa5ckajk8i7j68u9ufb850td70.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      })
    })
  }

  verifyToken(): Observable<boolean> {
    return this.http.get(`${environment.base_url}/login/renew`, this.headers).pipe(
      map((res: any) => {
        const { name, email, img = '', google, role, id } = res.usuarioDB;
        this.user = new Usuario(name, email, '', img, google, role, id);
        this.user.imprimirUsuario();
        localStorage.setItem('token', res.token);
        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(false)
      })
    )
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${environment.base_url}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  updateUser(data: { name: string, email: string, role: string }) {
    data = {
      ...data,
      role: this.user.role
    };
    return this.http.put(`${environment.base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(formData: LoginForm) {
    return this.http.post(`${environment.base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        }));
  }

  loginGoogle(token) {
    return this.http.post(`${environment.base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.sessionToken);
        }));
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }
}
