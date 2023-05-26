import { Component, OnInit } from '@angular/core';
import { EPlatforms } from 'src/app/shared/resources/product/EPlatforms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductForms } from './classes/ProductForm';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import { DecimalValidator } from '../../directives/decimal-validator.directive';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { Product } from 'src/app/shared/resources/product/Product';
import { LocationStrategy } from '@angular/common';
import { Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  /*
  @ViewChild('i-product-name') productName: IonInput;
  @ViewChild('i-platform')     platform:    IonInput;
  @ViewChild('i-price')        price:       IonInput;
  @ViewChild('i-releas-date')  releasDate:  IonInput;
  @ViewChild('i-stock')        stock:       IonInput;
  @ViewChild('i-description')  description: IonInput;
  */

  protected platforms = Object.values(EPlatforms);
  protected product = {
    name:        '',
    platform:    '',
    price:       '0,00',
    description: '',
    quantity:    0,
    releaseDate: null
  }
  protected form = new FormGroup<ProductForms>({
    name:        new FormControl(this.product.name,        [Validators.required]),
    platform:    new FormControl(this.product.platform),
    price:       new FormControl(Number( this.product.price.replace(',', '.') ), [
                                                                                    Validators.required, 
                                                                                    Validators.min(0), 
                                                                                    Validators.max(999.99), 
                                                                                    DecimalValidator.validPriceChecker(2)
                                                                                  ]),
    releaseDate: new FormControl(this.product.releaseDate, Validators.required),
    quantity:    new FormControl(this.product.quantity,    [Validators.required, Validators.min(0)]),
    description: new FormControl(this.product.description, Validators.maxLength(200))
  });
  // 0 - Toast "Agregando producto, espere..."
  // 1 - Toast "Producto añadido correctamente."
  // 2 - Alert "Ha ocurrido un error. Su producto no se ha añadido."
  // 3 - Alert "Se va a agregar su producto." Confirm/Cancel
  private uiMessages: Array<HTMLIonToastElement | HTMLIonAlertElement> = new Array(4);

  
  constructor(
    private productService: ProductsService, 
    private ionAlert:       AlertController, 
    private toast:          ToastController,
    private router:    LocationStrategy
    ) {} 

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('Cambios detectados.');
  //   this.form
  //     .setValue({
  //       name:        this.product.name,
  //       platform:    this.product.platform,
  //       price:       Number( this.product.price.replace(',', '.') ),
  //       releaseDate: this.product.releaseDate,
  //       quantity:    this.product.quantity,
  //       description: this.product.description
  //     });
  //     /*
  //     .get(['name', 'platform', 'price', 'releaseDate', 'quantity', 'description'])
  //     .setValue({
  //       name: this.product.name,
  //       platform: this.product.platform,
  //       price
  //     });
  //     */
  //    console.log('El formulario a cambiado a: ');
  //    console.log(this.form.getRawValue());
  // }

  ngOnInit(): void {

    this.toast.create({
      message: "Agregando producto, espere...",
      animated: true,
      duration: 3500
    }).then(htmlToast => this.uiMessages[0] = htmlToast);
    this.toast.create({
      message: "Producto añadido correctamente.",
      animated: true,
      duration: 3500
    }).then(htmlToast => this.uiMessages[1] = htmlToast);
    this.ionAlert.create({
      message: "Ha ocurrido un error. Su producto no se ha añadido.",
      animated: true,
      buttons: [
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => this.router.back()
        }
      ]
    }).then(htmlAlert => this.uiMessages[2] = htmlAlert);
    this.ionAlert.create({
      message: "Se va a agregar su producto.",
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel'
        },
        {
          text: "Confirmar",
          role: 'confirm',
          handler: () => {
            this.router.back();
            this.uiMessages[0].present();

            this.productService.save( new Product(
              null, 
              this.form.get('name')!.value!, 
              this.form.get('price')!.value!, 
              this.form.get('quantity')!.value!, 
              (this.form.get('releaseDate')!.value as Date), 
              this.form.get('platform')!.value!, 
              this.form.get('description')!.value!
            ))
              .then( () => {
                this.uiMessages[1].present();
              })
              .catch( (reason) => {
                this.uiMessages[2].present();
              });
          }
        }
      ],
      animated: true
    }).then(htmlIonAlert => this.uiMessages[3] = htmlIonAlert);

  }


  mostrarProducto() {
    console.log('IProducto');
    console.log(this.product);
    console.log('Formulario');
    console.log(this.form.getRawValue());
  }

  customOnChange(event: any, component: IonInput) {
    console.log('CustomOnChanges.');
    console.log( event );
    //let n = Number( (event as string).replace(',', '.') );
    //let n = String( Math.floor(Number( (event as string).replace(',', '.') ) * 100 / 100) ).split('.'); //.replace('.', ',');
    let n = String( Math.floor(Number( (component.value as string).replace(',', '.') ) * 100) / 100 ).split('.'); //.replace('.', ',');

    console.log(n);
    if (n.length < 2) {
      console.log('Entra en el if 1');
      n.push('00');
    } else if (n.length == 2) {
      while (n[1].length < 2) {
        console.log('Entra en el if 2');
        n[1] += '0';
      }
    }
    //event = Math.floor(Number(event) * 100) /100;
    //this.product.price = String( Math.floor(n * 100 / 100) ).replace('.', ',');
    console.log(n);
    this.product.price = n.join(',');
    component.value = this.product.price;
    this.refreshForm();
    //this.product.price = Math.floor(event * 100) /100;
    //this.refreshForm();
      /*
      .get(['name', 'platform', 'price', 'releaseDate', 'quantity', 'description'])
      .setValue({
        name: this.product.name,
        platform: this.product.platform,
        price
      });
      */
     console.log('El formulario a cambiado a: ');
     console.log(this.form.getRawValue());
     console.log(this.form.valid);
  }

  readData() {
    this.refreshForm();
  }

  refreshForm() {
    let relsDate: (string | Date | null) = null;

    if (typeof(this.product.releaseDate) === 'string') {
      relsDate = new Date(this.product.releaseDate);
    } else if (typeof(this.product.releaseDate) === 'object'  &&  Object.prototype.toString.call(this.product.releaseDate) === '[object Date]') {
      relsDate = this.product.releaseDate;
    }

    this.form
      .setValue({
        name:        this.product.name,
        platform:    this.product.platform,
        price:       Number( this.product.price.replace(',', '.') ),
        releaseDate: relsDate,
        quantity:    this.product.quantity,
        description: this.product.description
      });
  }

  addImage() {
    Filesystem
  }

  addProduct() { this.uiMessages[3].present(); }

}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on Apr-13-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */