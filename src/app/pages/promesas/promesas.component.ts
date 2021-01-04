import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [

  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then( console.log )
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola Mundo')
    //   } else {
    //     reject('Fallo el Hola Mundo')
    //   }
    // })

    // promise.then(
    //   (res) => {
    //     console.log(res)
    //   }
    // ).catch(
    //   (err) => {
    //     console.log(err)
    //   }
    // )

    // console.log('Chao Mundo')

  }

  getUsers = () => {
    const promise = new Promise( (resolve) => {
      fetch('https://reqres.in/api/users?page=2')
      .then((res) => res.json())
      .then((body) => resolve(body.data))
    })
    return promise
  }
}
