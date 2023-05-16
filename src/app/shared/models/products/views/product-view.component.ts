/*
 * Created by Salo417 (GitHub/email: schooldayssal@gmail.com). At Feb-13-2023.
 */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductController } from '../controllers/ProductController';
import { IProduct } from '../../../resources/product/IProduct';
import { Product } from '../models/Product';


@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit, OnDestroy {
  // COMPONENT COMMUNICATIONS
  @Input()  product: IProduct;
  @Output() delEvent  = new EventEmitter<Product>();
  @Output() editEvent = new EventEmitter<Product>();


  // PROPERTIES
  //onEdit:   Observable<IProduct>;//{onSuccess: () => void, onRejected: (error: Error) => void};
  //onDelete: Observable<void>;
  //onDelete: () => void;

  protected controller: ProductController;


  // CONSTRUCTOR
  constructor() { }


  // LIFECYCLED
  ngOnInit() {
    this.controller = new ProductController(this.product);
  }

  ngOnDestroy(): void { /*this.onDelete();*/ }

  
  // METHODS
  protected edit() {
    //this.onEdit.onSuccess();
    this.editEvent.emit( Product.generateProduct(this.controller.product) );
    // Editado despues this.controller.product = this.product;
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
    this.delEvent.emit( Product.generateProduct(this.controller.product) );
  }

  /**
   * Determine if product controller is empty, because the view blok if is empty.
   * @returns True if product controller is empty, false if not.
   */
  protected isProductEmpty(): boolean {
    return this.controller == undefined;
  }
}
