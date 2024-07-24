import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: ``
})
export class PromesasComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

    this.getUsers()
      .then( usuarios => {
        console.log(usuarios)
      })

    /* this.getUsers(); */

    /* const promesa = new Promise( ( resolve, reject ) => {

      if( false ){
        resolve('promise en proceso');
      } else {
        reject('A ocurrido algo, por favor espere');
      }

    });

    promesa.then( (message) => {
      console.log(message)
    })
    .catch( error => console.log('Error in my promise,', error) )

    console.log('fin de la Promesi'); */

  };

  getUsers() {

    const promesa = new Promise( resolve => {

      fetch('https://reqres.in/api/users')
      .then( res => res.json() )
      .then( body => resolve(body.data) )

    })
    return promesa;

  };

}
