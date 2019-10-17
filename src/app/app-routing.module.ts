import { RegisterProductComponent } from './view/register-product/register-product.component';
import { RequestsComponent } from './view/requests/requests.component';
import { ProductComponent } from './view/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },

  {
    path: '',
    children: [
      { path: 'product', component: ProductComponent },
      { path: 'requests', component: RequestsComponent },
      { path: 'addProduct', component: RegisterProductComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
