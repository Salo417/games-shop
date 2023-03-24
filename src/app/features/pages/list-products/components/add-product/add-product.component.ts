import { Component, OnInit } from '@angular/core';
import { EPlatforms } from 'src/app/shared/models/products/models/EPlatforms';
import { FormControl, FormGroup } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/products/models/IProduct';
import { ProductForms } from './classes/ProductForm';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  protected form = new FormGroup<ProductForms>({
    name:        new FormControl(''),
    platform:    new FormControl(''),
    price:       new FormControl(0.0),
    releaseDate: new FormControl('dd/mm/aaaa'),
    quantity:    new FormControl(0),
    description: new FormControl('')
  });
  
  constructor() {} 

  ngOnInit(): void {}


}
