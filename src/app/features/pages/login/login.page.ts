import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserLogedService } from 'src/app/core/services/api/user-loged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userEmail: FormControl = new FormControl('');
  password:  FormControl = new FormControl('');

  constructor(private userService: UserLogedService, private router: Router, private alertCtrl:   AlertController) { }

  ngOnInit() {
  }

  // Temporal
  verUsuariosConsole(): void {
    console.log(this.userService.user);
  }

  login() {
    let email = this.userEmail.value.toString();
    let pass  = this.password.value.toString();
    this.userService.authUser(email, pass)
      .then( async user => {
        this.router.navigate(['home']);
      })
      .catch( async error => {
        const dialogue = await this.alertCtrl.create({
          header:  "ERROR",
          message: error.message,
          buttons: [
            {
              text:    'Vale',
              role:    'cancel',
            }
          ]
        });
        
        await dialogue.present();
      });
  }

}
