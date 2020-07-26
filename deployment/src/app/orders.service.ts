import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { OrdersModel } from './orders.model';
import { environment } from '../environments/environment';

const Backend_Url = environment.api_Url;

@Injectable({ providedIn: "root" })

export class OrdersService {
  orders: OrdersModel[];
  private ordersListener = new Subject<OrdersModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getOrdersList(customerId: string) {
    this.http.get<{message: string, orders: any}>(Backend_Url + "/order/get_customer_orders/" + customerId)
      .subscribe(response => {
        this.orders = response.orders;
        this.ordersListener.next([...this.orders]);
      });
  }

  getAllOrders() {
    this.http.get<{message: string, orders: any}>(Backend_Url + "/order/get_all_orders")
      .subscribe(response => {
        console.log(response.orders);
        console.log("gvgdtd");
        this.orders = response.orders;
        this.ordersListener.next([...this.orders]);
      });
  }

  deleteOrderItem(productId: string, orderId: string, totalPrice: number) {
    const data = {
      productId: productId,
      totalPrice: totalPrice
    }
    return this.http.put(Backend_Url + "/order/update/" + orderId, data);
  }

  cancelOrder(orderId: string) {
    return this.http.delete(Backend_Url + "/order/delete/" + orderId);
  }

  getOrdersUpdateListener() {
    return this.ordersListener.asObservable()
  }

}
