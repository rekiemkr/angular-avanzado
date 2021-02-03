import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePhoto(
    photo: File,
    type: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ) {

    try {

      const url = `${base_url}/upload/${type}/${id}`;

      const formData = new FormData();
      formData.append('imagen', photo);

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })
      const data = await resp.json();

      return data.ok ? data.nameFile : data.ok;

    } catch (error) {
      console.log('Error=>', error)
      return false;
    }

  }

}
