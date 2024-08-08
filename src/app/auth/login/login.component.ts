import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';

declare const google: any;

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSumitted = false;
  public auth2: any;

  public loginForms = this.fb.group({

    email: [ localStorage.setItem('email') || '' , [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]],
    remenber: [false],

  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {

    this.googleInit();

  };

  googleInit() {
    google.accounts.id.initialize({
      client_id: "536659528116-n7lhk3b2b3re54vc75defnnjbi7v6auq.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      /* document.getElementById("buttonDiv"), */
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  };

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuariosService.loginGoogle( response.credential )
      .subscribe( resp => {
        // Navegacion al dashboard...
        this.router.navigateByUrl('/');
      })
  };

  login() {

    // Error en el codigo...
    this.usuariosService.login( this.loginForms.value )
        .subscribe( resp => {

          if(this.loginForms.get('remenber')?.value) {
            localStorage.setItem('email', this.loginForms.get('email')?.value)
          } else {
            localStorage.removeItem('email');
          };

          // Navegacion al dashboard...
          this.router.navigateByUrl('/');


        }, (err) => {
          // Si sucede un error...
          Swal.fire('Error', err.error.msg, 'error');
        });

    /* console.log(this.loginForms.value) */

    /* this.router.navigateByUrl('/'); */

  };

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp() {
    
    await this.usuariosService.googleInit();
    this.auth2 = this.usuariosService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };

  attachSignin(element) {
    
    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            // console.log(id_token);
            this.usuariosService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                })
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
