import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartModel } from './shopping_cart.model';
import { CartIdModel } from './cart_id.model';
import { OrderModel } from './order.model';
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class CartService {
  private cartItems: CartIdModel[] = [];
  total = 0;
  private cartIdListener = new Subject<CartIdModel[]>();
  private totalListener = new Subject<number>();

  constructor(private http: HttpClient, private router: Router) {}

  addToCart(prod: CartModel) {
    return this.http.post("http://localhost:3000/api/cart/add", prod);
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
        var i;
        this.total = 0;
        for(i in this.cartItems) {
          this.total = this.total + this.cartItems[i].quantity*this.cartItems[i].price;
        }
        this.totalListener.next(this.total);
        this.cartIdListener.next([...this.cartItems]);
      });
  }

  getTotal(){
    return this.totalListener.asObservable();
  }

  updateItem(item: CartIdModel) {
    this.http.put("http://localhost:3000/api/cart/update/" + item.id, item).subscribe(response => {
      this.router.navigate(['/shopping_cart/' + item.customerId])
    });
  }

  placeOrder(cartItems: CartIdModel[], mobile: string, streetAdress: string, city: string, state: string, country: string, pinCode: number, totalPrice: number) {
    var date = new Date();
    const order: OrderModel = {
      date: date.getTime(),
      customerId: cartItems[0].customerId,
      customerName: localStorage.getItem("userName"),
      mobile: mobile,
      streetAdress: streetAdress,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
      totalPrice: totalPrice,
      products: cartItems
    };
    return this.http.post("http://localhost:3000/api/order/place", order);
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
