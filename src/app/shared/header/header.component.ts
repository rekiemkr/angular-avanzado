import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user: any;

  constructor(private usuariosService: UsuariosService) { 
    this.user = usuariosService.user;
  }

  ngOnInit(): void {
  }

  logout() {
    this.usuariosService.logout();
  }

}
