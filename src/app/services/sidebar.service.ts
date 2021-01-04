import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [
    {
      title: 'Dashboard!!',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Graficas', url: '/dashboard/grafica1' },
        { title: 'Main', url: '/dashboard' },
        { title: 'ProgressBar', url: '/dashboard/progress' },
        { title: 'Promesas', url: '/dashboard/promesas' },
        { title: 'rxjs', url: '/dashboard/rxjs' },
      ]
    }
  ]

  constructor() { }
}
