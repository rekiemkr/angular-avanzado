import { UsuariosService } from './../services/usuarios.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log(this.usuariosService.verifyToken());
    return this.usuariosService.verifyToken()
      .pipe(
        tap(auth => {
          if(!auth) {
            this.router.navigateByUrl('/login')
          }
        })
      );
  }

}
