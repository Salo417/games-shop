import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { EPlatforms } from 'src/app/shared/models/products/models/EPlatforms';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/products/models/IProduct';
import { ProductForms } from './classes/ProductForm';
import { IonInput } from '@ionic/angular';
import { DecimalValidator } from './directives/decimal-validator.directive';

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
    price:       '0,00',
    description: '',
    quantity:    0,
    releaseDate: undefined
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

  
  constructor() {} 

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Cambios detectados.');
    this.form
      .setValue({
        name:        this.product.name,
        platform:    this.product.platform,
        price:       Number( this.product.price.replace(',', '.') ),
        releaseDate: this.product.releaseDate,
        quantity:    this.product.quantity,
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
    this.form
    .setValue({
      name:        this.product.name,
      platform:    this.product.platform,
      price:       Number( this.product.price.replace(',', '.') ),
      releaseDate: this.product.releaseDate,
      quantity:    this.product.quantity,
      description: this.product.description
    });
  }

  addProduct() {
    alert(`Tu producto ${this.product.name} va a ser agregado a la base de datos del backend de la Salo Shop. (Texto provisional no se guarda en el backend).`);
  }

}
