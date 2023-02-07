import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { AlertController, IonInput } from '@ionic/angular';
import { UserLogedService } from 'src/app/core/services/api/user-loged.service';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/core/classes/IUser';

@Component({
  selector:    'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls:   ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  @ViewChild('user')     user: IonInput;
  @ViewChild('password') pass: IonInput;

  userName:     FormControl = new FormControl('');
  formEmail:    FormControl = new FormControl('');
  textPassword: FormControl = new FormControl('');


  constructor(
    private userService: UserLogedService, 
    private location:    Location,
    private alertCtrl:   AlertController
  ) { }

  ngOnInit() {
  }

  /**
   * Method for register an user. It works asyncronous and display a dialogue if user has been submitted correctly.
   */
  async signingUp() {

    /*
    if (this.user.value != null  ||  this.pass.value != null) {
      let user:     string = this.user.value.toString();
      let password: string = this.pass.value.toString();
      */
    let userName:    string = this.userName.value.toString();
    let email:       string = this.formEmail.value.toString();
    let password:    string = this.textPassword.value.toString();
    let createdUser: IUser  = { username: userName, email: email, password: password, picture: null }

    let pageFinish: boolean = false;

    await this.userService.postUser(createdUser)
        .then( async response => {
          console.log(`Uauario registrado correctamente: ${response}`);
          const dialogue = await this.alertCtrl.create({
            message: "El usuario se ha registrado correctamnete.",
            buttons: [{
              text: 'Vale',
              role: 'seguir',
              handler: () => pageFinish = true
            }]
          });

          await dialogue.present();

          await dialogue.onDidDismiss().then( value => {
              return new Promise( value => {
                console.log("Continuando en then... Page Finish: " + pageFinish);
                if (pageFinish) this.location.back();
              });
          });
        })

        .catch( async error => {
          console.error(error);
          const dialogue = await this.alertCtrl.create({
            header:  "ERROR",
            message: `Se ha producido un error ${error.message}`,
            buttons: [
              {
                text:    'Cancelar',
                role:    'volver',
                handler: () => pageFinish = true
              }, 
              {
                text:    'Reintentar',
                role:    'cancel',
              }
            ]
          });
          
          await dialogue.present();
      
          await dialogue.onDidDismiss().then( event => {
            return new Promise( value => {
              console.log("Continuando en catch... Page Finish: " + pageFinish);
              if (pageFinish) this.location.back();
            });
          });
        });
  }

}
