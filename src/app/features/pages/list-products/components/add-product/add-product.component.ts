import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EPlatforms } from 'src/app/shared/models/products/models/EPlatforms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/products/models/IProduct';
import { ProductForms } from './classes/ProductForm';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnChanges {
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
    price:       0.00,
    description: '',
    quantity:    0,
    releaseDate: undefined
  }
  protected form = new FormGroup<ProductForms>({
    name:        new FormControl(this.product.name,        [Validators.required]),
    platform:    new FormControl(this.product.platform),
    price:       new FormControl(this.product.price/*Number( this.product.price.replace(',', '.') )*/,       [Validators.required, Validators.min(0)]),
    releaseDate: new FormControl(this.product.releaseDate, Validators.required),
    quantity:    new FormControl(this.product.quantity,    [Validators.required, Validators.min(0)]),
    description: new FormControl(this.product.description, Validators.maxLength(200))
  });

  
  constructor() {} 

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Cambios detectados.');
    this.form
      .setValue({
        name: this.product.name,
        platform: this.product.platform,
        price: this.product.price/*Number( this.product.price.replace(',', '.') )*/,
        releaseDate: this.product.releaseDate,
        quantity: this.product.quantity,
        description: this.product.description
      });
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
  }

  ngOnInit(): void {}


  mostrarProducto() {
    console.log('IProducto');
    console.log(this.product);
    console.log('Formulario');
    console.log(this.form.getRawValue());
  }

  customOnChange(event: any, component: IonInput) {
    console.log('Cambios detectados en ngModel.');
    console.log( event );
    //(event as string).replace(',', '.');
    //event = Math.floor(Number(event) * 100) /100;
    this.product.price = Math.floor(event * 100) /100; //String(Math.floor(Number( (event as string).replace(',', '.') ) * 100) /100).replace('.', ',');
    component.value = this.product.price;
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

  refreshForm() {
    this.form
    .setValue({
      name: this.product.name,
      platform: this.product.platform,
      price: this.product.price/*Number( this.product.price.replace(',', '.') )*/,
      releaseDate: this.product.releaseDate,
      quantity: this.product.quantity,
      description: this.product.description
    });
  }

  addProduct() {
    alert(`Tu producto ${this.product.name} va a ser agregado a la base de datos del backend de la Salo Shop. (Texto provisional no se guarda en el backend).`);
  }
}
