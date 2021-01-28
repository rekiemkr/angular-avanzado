import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import Swal from 'sweetalert2'

import { UsuariosService } from './../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Cristian', [Validators.required, Validators.minLength(3)]],
    email: ['cfelipevargas97@gmail.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordVerify: ['', [Validators.required]],
    terms: ['', [Validators.requiredTrue]],
  }, {
    validators: this.passwordSame('password', 'passwordVerify')
  })

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router) { }


  createUser() {
    this.formSubmitted = true;
    if (!this.registerForm.valid) {
      return;
    }
    const createUser$ = this.usuarioService.createUser(this.registerForm.value)
      .subscribe(
        (res: HttpResponse<object>) => {
          this.router.navigateByUrl('/');
        },
        (err: HttpErrorResponse) => {
          Swal.fire('Error', err.error.msg, 'error');
        },
        () => {
          createUser$.unsubscribe();
        }
      )

  }

  validateCampo(campo: string): boolean {
    return (this.registerForm.get(campo).invalid && this.formSubmitted);
  }

  passwordsNotSame() {
    const pass = this.registerForm.get('password').value;
    const passVerify = this.registerForm.get('passwordVerify').value;
    return ((pass !== passVerify) && this.formSubmitted);
  }

  /* Custom validation */
  passwordSame(pass: string, passVerify: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(pass);
      const pass2 = formGroup.get(passVerify);
      if (pass1.value === pass2.value) {
        pass2.setErrors(null);
      } else {
        pass2.setErrors({ noEsIgual: true });
        console.log(pass2);
      }
    }
  }
}
