import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Product } from 'src/app/shared/models/products/models/Product';
import { ProductsService } from '../../services/product-service/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {
  
  ngOnInit(): void {}

}
