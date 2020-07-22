import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartModel } from './shopping_cart.model';
import { CartIdModel } from './cart_id.model';
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class CartService {
  private cartItems: CartIdModel[] = [];
  private cartIdListener = new Subject<CartIdModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addToCart(prod: CartModel) {
    this.http.post("http://localhost:3000/api/cart/add", prod).subscribe(response => {
      console.log(response);
    }), error => {
      console.log("product not added to cart");
    }
  }

  getCartItem(customerId: string) {
    this.http.get<{message: string, products: any}>("http://localhost:3000/api/cart/get_cart_item/" + customerId)
      .pipe(map((productData) => {
        return productData.products.map(product => {
          return {
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            retailerId: product.retailerId,
            shopName: product.shopName,
            productId: product.productId,
            customerId: product.customerId,
            quantity: product.quantity,
            id: product._id
          };
        });
      }))
      .subscribe(tranformedData => {
        this.cartItems = tranformedData;
        this.cartIdListener.next([...this.cartItems]);
      });
  }

  deleteItem(productId: string){
    return this.http.delete("http://localhost:3000/api/cart/delete/" + productId);
  }

  deleteAllItem(customerId: string) {
    return this.http.delete("http://localhost:3000/api/cart/delete_all/" + customerId);
  }

  getCartItemListener() {
    return this.cartIdListener.asObservable();
  }

}
