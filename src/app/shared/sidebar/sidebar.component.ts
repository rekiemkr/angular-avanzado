import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public user: any;

  constructor(private sidebarService: SidebarService, private usuariosService:UsuariosService ) { 
   
    this.user = usuariosService.user;

    this.menuItems = this.sidebarService.menu
    console.log(this.menuItems);
  }

  ngOnInit(): void {
  
  }

}
