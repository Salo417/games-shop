import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EPlatforms } from 'src/app/shared/resources/product/EPlatforms';
import { DecimalValidator } from '../../directives/decimal-validator.directive';
import { ProductsService } from 'src/app/features/services/product-service/products.service';
import { AlertController, IonInput, ToastController } from '@ionic/angular';
import { Product } from 'src/app/shared/resources/product/Product';
import { ProductForms } from './classes/ProductForm';
import { IProduct } from 'src/app/shared/resources/product/IProduct';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import { TmpProduct } from './classes/TmpProduct';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent  implements OnInit {
  @Input('product') iProduct: IProduct | undefined;

  protected platforms = Object.values(EPlatforms);
  protected product: TmpProduct = {
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
    // 0 - Toast "Editando, espera"
    // 1 - Toast "Producto editado correctamente."
    // 2 - Alert "Ha ocurrido un error. Su producto no se editará."
    private uiMessages: Array<HTMLIonToastElement | HTMLIonAlertElement> = new Array(3);

  
  constructor(
    private productService: ProductsService, 
    private router:         LocationStrategy,
    private paramRoute:     ActivatedRoute,
    private toast:          ToastController,
    private ionAlert:       AlertController
    ) {} 

  async ngOnInit() {
    this.checkProductInput();

    this.toast.create({
      message: "Editando, espere...",
      animated: true,
      duration: 3500
    }).then(htmlToast => this.uiMessages[0] = htmlToast);
    this.toast.create({
      message: "Producto editado correctamente.",
      animated: true,
      duration: 3500
    }).then(htmlToast => this.uiMessages[1] = htmlToast);
    this.ionAlert.create({
      message: "Ha ocurrido un error. Su producto no se editará.",
      animated: true,
      buttons: [
        {
          text: 'Confirmar',
          role: 'confirm'
        }
      ]
    }).then(htmlAlert => this.uiMessages[2] = htmlAlert);

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
    let n = String( Math.floor(Number( (component.value as string).replace(',', '.') ) * 100) / 100 ).split('.');

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

    console.log(n);
    this.product.price = n.join(',');
    component.value = this.product.price;
    this.refreshForm();

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

  updateProduct() {

    this.router.back();
    this.uiMessages[0].present();

    this.productService.update( new Product(
      this.iProduct!.pid, 
      this.form.get('name')!.value!, 
      this.form.get('price')!.value!, 
      this.form.get('quantity')!.value!, 
      (this.form.get('releaseDate')!.value as Date), 
      this.form.get('platform')!.value!, 
      this.form.get('description')!.value!
    ))
      .subscribe({
        error:    (reason) => this.uiMessages[2].present(),
        complete: ()       => this.uiMessages[1].present()
      });

  }

  private priceNumberToString(price: number): string {
    const p1 = String(price).split('.');

    if (p1.length == 1) {
      p1.push('00');
    }

    return p1.join(',');
  }

  private checkProductInput() {
    /*
    this.product = {
      name:        (this.iProduct.name != undefined) ? this.iProduct.name : '',
      platform:    (this.iProduct.platform != undefined) ? this.iProduct.platform : '',
      price:       this.priceNumberToString(this.iProduct.price),
      description: (this.iProduct.description != undefined) ? this.iProduct.description : '',
      quantity:    this.iProduct.quantity,
      releaseDate: this.iProduct.releaseDate
    }
    */
    this.paramRoute.paramMap.pipe(
      map(params => params.get('pid'))).subscribe( async pid => {
        console.debug("Entering in paramRouter...");
        console.debug(pid);
        await this.productService.getById( Number(pid) ).then(product => this.iProduct = product);

        this.product = {
          name:        (this.iProduct!.name != undefined) ? this.iProduct!.name : '',
          platform:    (this.iProduct!.platform != undefined) ? this.iProduct!.platform : '',
          price:       this.priceNumberToString(this.iProduct!.price),
          description: (this.iProduct!.description != undefined) ? this.iProduct!.description : '',
          quantity:    this.iProduct!.quantity,
          releaseDate: this.iProduct!.releaseDate
        }

        this.refreshForm();
      });
  }
}

/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com) on May-04-2023.
 * This source code is governed by:
 * 
 * BSD 3-Clause License (That can be found in LICENCE file)
 *
 * Copyright (c) 2023, Salo417 (GitHub/email: schooldayssal@gmail.com)
 */