import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { UsuariosService } from './../../services/usuarios.service';

declare const gapi;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailRemember = localStorage.getItem('email') || '';
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [this.emailRemember, [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false, [Validators.required]],
  })

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuariosService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        (res: HttpResponse<object>) => {
          this.router.navigateByUrl('/');
          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value);
          } else {
            localStorage.removeItem('email');
          }
        },
        (err: HttpErrorResponse) => {
          Swal.fire('Error', err.error.msg, 'error');
          console.log(err);
        },
        () => {
          console.log('Unsubscribe');
        }
      )
  }


  renderButton() {
    console.log('gapi=>',gapi)
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    setTimeout(() => this.startApp(), 1000);
  }

  async startApp() {
    this.auth2 = await this.usuarioService.googleInit();
    this.attachSignin(document.getElementById('my-signin2'));
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const { id_token } = googleUser.getAuthResponse();
        const loginGoogle$ = this.usuarioService.loginGoogle(id_token).subscribe(
          res => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          },
          err => {
            Swal.fire('Error', 'Fallo algo', 'error');
          },
          () => {
            loginGoogle$.unsubscribe();
          }
        );
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
        Swal.fire('Error', 'Fallo algo', 'error');
      });
  }
}
