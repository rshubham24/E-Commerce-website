import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginAdminComponent } from './auth/login_admin/login_admin.component';
import { DialogElementsDialog } from './customer/shopping_cart/shopping_cart.component';
import { HeaderComponent } from './header/header.component';
import { SignupCustomerComponent } from './auth/signup_customer/signup_customer.component';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './error-interceptor';
import { HomeComponent } from './home/home.component';
import { CustomerOrderComponent } from './customer/orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { LoginCustomerComponent } from './auth/login_customer/login_customer.component';
import { LoginRetailerComponent } from './auth/login_retailer/login_retailer.component';
import { SignupRetailerComponent } from './auth/signup_retailer/signup_retailer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditProductComponent } from './retailer/edit_posts/edit_product.component';
import { ShoppingCartComponent } from './customer/shopping_cart/shopping_cart.component';
import { ManageProductsComponent } from "./retailer/manage_products/manage_products.component";
import { NewProductComponent } from "./retailer/new_product/new_product.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ManageProductsComponent,
    SignupCustomerComponent,
    ErrorComponent,
    LoginCustomerComponent,
    LoginRetailerComponent,
    LoginAdminComponent,
    AdminComponent,
    SignupRetailerComponent,
    ShoppingCartComponent,
    CustomerOrderComponent,
    DialogElementsDialog,
    NewProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
