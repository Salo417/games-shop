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

  protected product: IProduct = {
    name:        '',
    platform:    '',
    price:       0.0,
    description: '',
    quantity:    0,
    releaseDate: undefined
  }
  protected form = new FormGroup<ProductForms>({
    name:        new FormControl(this.product.name,        [Validators.required]),
    platform:    new FormControl(this.product.platform),
    price:       new FormControl(this.product.price,       [Validators.required, Validators.min(0)]),
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
        price: this.product.price,
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

  customOnChange(event: any) {
    console.log('Cambios detectados en ngModel.');
    this.form
      .setValue({
        name: this.product.name,
        platform: this.product.platform,
        price: this.product.price,
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
     console.log(this.form.valid);
  }

  addProduct() {
    alert(`Tu producto ${this.product.name} va a ser agregado a la base de datos del backend de la Salo Shop. (Texto provisional no se guarda en el backend).`);
  }
}
