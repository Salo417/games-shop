import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogedService } from './services/connections/user-loged.service';
import { ProductsApiService } from './services/connections/products-api.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: []
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(/*userService?: UserLogedService*/): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [UserLogedService, ProductsApiService]
    }
  }

  static forChild(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule
    }
  }
}
