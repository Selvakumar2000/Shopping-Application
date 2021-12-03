import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../_guards/authentication.guard';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: ProductsHomeComponent
      },
      {
        path: 'display/:product',
        component: ProductDisplayComponent
      },
      {
        path: 'upload/:product',
        component: ProductUploadComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
