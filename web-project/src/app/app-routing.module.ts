import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginRetailerComponent } from './auth/login_retailer/login_retailer.component';
import { LoginCustomerComponent } from './auth/login_customer/login_customer.component';
import { SignupRetailerComponent } from './auth/signup_retailer/signup_retailer.component';
import { SignupCustomerComponent } from './auth/signup_customer/signup_customer.component';
import { ShoppingCartComponent } from './shopping_cart/shopping_cart.component';
import { NewProductComponent } from './retailer/new_product/new_product.component';
import { ManageProductsComponent } from './retailer/manage_products/manage_products.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup_customer", component: SignupCustomerComponent },
  { path: "login_customer", component: LoginCustomerComponent },
  { path: "signup_retailer", component: SignupRetailerComponent },
  { path: "login_retailer", component: LoginRetailerComponent },
  { path: "shopping_cart", component: ShoppingCartComponent },
  { path: "manage/:userId", component: ManageProductsComponent },
  { path: "new", component: NewProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
