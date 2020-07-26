import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '../product-model';
import { Subscription } from 'rxjs';
import { CartModel } from '../shopping_cart.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  products: ProductModel[] = [];
  isLoading = false;
  private productsSub: Subscription;
  private mode = "home";
  customerid: string;

  constructor(public productService: ProductService, public route: ActivatedRoute, public cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.customerid = params['id'];
    });
    if(this.customerid){
      this.mode = "customer";
    }
    this.isLoading = true;
    this.productService.getProducts();
    this.productsSub = this.productService.getProductUpdateListener()
      .subscribe((products: ProductModel[]) => {
        this.products = products;
        this.isLoading = false;
      })
  }

  addToCart(prod: ProductModel){
    if(this.mode === "home"){
      return;
    }
    const cartProd: CartModel = {
      title: prod.title,
      price: prod.price,
      category: prod.category,
      imageUrl: prod.imageUrl,
      retailerId: prod.retailerId,
      shopName: prod.shopName,
      productId: prod.id,
      customerId: this.customerid,
      quantity: 1
    };
    this.cartService.addToCart(cartProd)
      .subscribe(response => {
        this.snackBar.open('Item added to the Cart!!', 'Ok', {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }), error => {
        this.snackBar.open('Unable to add the Cart!!', 'Ok', {
          duration: 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
