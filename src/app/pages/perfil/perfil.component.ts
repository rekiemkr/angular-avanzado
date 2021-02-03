import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [`
    .container-image{
      display: flex;
      width: 100%;
      height: 150px;
      justify-content: space-evenly;
      align-items: center;
    }
    .img-avatar{
      border-radius: 50%;
      width: 100px;
      height :100px;
    }
  `
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagen: File;
  public imagenTemp: string | ArrayBuffer;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private uploadService: FileUploadService) {
    this.usuario = usuariosService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.usuario.name, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    })
  }

  actualizarPerfil() {
    this.usuariosService.updateUser(this.profileForm.value).subscribe(
      (res) => {
        const { name, email } = this.profileForm.value;
        this.usuario.name = name;
        this.usuario.email = email;
        Swal.fire('Guardado', 'El usuario fue actualizado ', 'success');
      },
      err => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  changeImage(file: File) {
    this.imagen = file;
    if (!file) return this.imagenTemp = null;

    const reader = new FileReader();

    reader.readAsDataURL(this.imagen);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
      console.log(reader.result);
    }
  }

  uploadImage() {
    this.uploadService
      .updatePhoto(this.imagen, 'usuarios', this.usuario.uid)
      .then(img => {
        Swal.fire('Imagen Actualizada', 'Tu imagen se ha actualizado correctamente', 'success');
        this.usuario.img = img
      })
      .catch(err => {
        Swal.fire('Error', 'No se pudo subir esta imagen', 'error');
      })
  }
}
