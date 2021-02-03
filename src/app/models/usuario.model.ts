import { environment } from "src/environments/environment";

const { base_url } = environment;

export class Usuario {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public uid?: string,
    ) { 
    }

    imprimirUsuario() {
        console.log(this);
    }

    get imagenURL() {
        // `https://placekitten.com/96/96`;
        let image = `${base_url}/upload/default/no-img.jpg`;
        if (this.img) {
            const initUrl = this.img.slice(0, 5);
            if (initUrl === 'https') {
                image = this.img;
            } else {
                image = `${base_url}/upload/usuarios/${this.img}`;
            }
        }
        return image;
    }

    get firstName() {
        return this.name.split(' ')[0];
    }
}