import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsHomeComponent
  },
  {
    path: ':product',
    component: ProductDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
