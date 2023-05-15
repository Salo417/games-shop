import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { FullCalendarModule } from '@fullcalendar/angular';
//import dayGridPlugin from '@fullcalendar/daygrid';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './features/pages/list-products/components/add-product/add-product.component';
import { ProductsService } from './features/services/product-service/products.service';
import { EditProductComponent } from './features/pages/list-products/components/edit-product/edit-product.component';
//import interactionPlugin from '@fullcalendar/interaction';


/*
FullCalendarModule.registerPlugins([
  dayGridPlugin
]);
*/

@NgModule({
  declarations: [AppComponent/*, AddProductComponent, EditProductComponent*/],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    //FullCalendarModule,
    CoreModule.forRoot()
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
