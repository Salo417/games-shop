/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At feb-13-2023.
 */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductController } from '../controllers/ProductController';
import { IProduct } from '../models/IProduct';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  // COMPONENT COMMUNICATIONS
  @Input()  product: IProduct;
  @Output() delEvent  = new EventEmitter<void>();
  @Output() editEvent = new EventEmitter<void>();


  // PROPERTIES
  //onEdit:   Observable<IProduct>;//{onSuccess: () => void, onRejected: (error: Error) => void};
  //onDelete: Observable<void>;
  onDelete: () => void;

  protected controller: ProductController;


  // CONSTRUCTOR
  constructor() { }


  // LIFECYCLED
  ngOnInit() {}

  ngOnDestroy(): void { this.onDelete(); }

  
  // METHODS
  protected edit() {
    //this.onEdit.onSuccess();
    this.editEvent.emit();
    this.controller.product = this.product;
    /*
    this.onEdit.subscribe( (prod) => {
      this.controller.product = prod;
    });
    */
  }

  protected delete() {
    /*
    this.onDelete.subscribe( () => {
      this.controller
    })
    */
    //this.onDelete();
    this.delEvent.emit();
  }
}
