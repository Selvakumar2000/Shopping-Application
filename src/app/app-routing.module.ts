import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsHomeComponent } from './products/products-home/products-home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./homepage/homepage.module')
                       .then(module => module.HomepageModule)
  },
  {
    path: 'products',
    loadChildren: ()=> import('./products/products.module')
                       .then(module => module.ProductsModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
