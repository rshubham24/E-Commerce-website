import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '../product-model';
import { Subscription } from 'rxjs';
import { CartModel } from '../shopping_cart.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
  products: ProductModel[] = [];
  isLoading = false;
  private productsSub: Subscription;
  private mode = "home";
  customerid: string;

  constructor(public productService: ProductService, public route: ActivatedRoute, public cartService: CartService) {}

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
    this.cartService.addToCart(cartProd);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
