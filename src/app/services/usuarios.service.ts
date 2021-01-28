import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  googleInit() {
    return new Promise( resolve => {
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
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${environment.base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map(
        (res: any) => res.ok
      ),
      catchError((error) => of(false))
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
