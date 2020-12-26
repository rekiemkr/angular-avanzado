import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public refTheme = document.querySelector(`#theme`)
  public themes: NodeListOf<Element>

  constructor() {
    const themeSaved = localStorage.getItem('theme') || './assets/css/colors/red-dark.css'
    this.refTheme.setAttribute('href', themeSaved)
  }

   changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`
    this.refTheme.setAttribute('href', url)
    localStorage.setItem('theme', url)
    this.checkCurrentTheme()
  }

  
  checkCurrentTheme = (): void => {
    const links = document.querySelectorAll('.selector')
    links.forEach((tag) => {
      tag.classList.remove('working')
      const btnTheme = tag.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`
      const currentTheme = this.refTheme.getAttribute('href')
      if( btnThemeUrl === currentTheme ) {
        tag.classList.add('working')
      }
    })
  }

}
