import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupCustomerComponent } from './auth/signup_customer/signup_customer.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { LoginCustomerComponent } from './auth/login_customer/login_customer.component';
import { LoginRetailerComponent } from './auth/login_retailer/login_retailer.component';
import { SignupRetailerComponent } from './auth/signup_retailer/signup_retailer.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartComponent } from './shopping_cart/shopping_cart.component';
import { ManageOrdersComponent } from "./manage_orders/manage_orders.component";
import { NewProductComponent } from "./new_product/new_product.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ManageOrdersComponent,
    SignupCustomerComponent,
    LoginCustomerComponent,
    LoginRetailerComponent,
    SignupRetailerComponent,
    ShoppingCartComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
