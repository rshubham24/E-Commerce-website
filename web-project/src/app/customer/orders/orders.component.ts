import { Component, OnInit, OnDestroy, ɵConsole} from '@angular/core';
import { OrdersService } from '../../orders.service';
import { OrdersModel } from '../../orders.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class CustomerOrderComponent implements OnInit, OnDestroy{
  orders: OrdersModel[] = [];
  private ordersSub: Subscription;
  customerId: string;
  isLoading = false;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.isLoading = true;
    this.customerId = localStorage.getItem("userId");
    this.ordersService.getOrdersList(this.customerId);
    this.ordersSub = this.ordersService.getOrdersUpdateListener()
      .subscribe((orders: OrdersModel[]) => {
        this.orders = orders;
        this.isLoading = false;
      });
  }

  date(time: number){
    const expectedDate = new Date(time + 5*24*60*60*1000);
    const date = expectedDate.getDate();
    const month = expectedDate.getMonth();
    const year = expectedDate.getFullYear();
    return date + "/" + month + '/' + year;
  }

  onDeleteItem(prodId: string, orderId: string, prodPrice: number, totalPrice: number, prod: any){
    this.isLoading = true;
    if(prod.length <= 1){
      return this.cancelOrder(orderId);
    }
    this.ordersService.deleteOrderItem(prodId, orderId, totalPrice - prodPrice)
    .subscribe(() => {
      this.ordersService.getOrdersList(this.customerId);
    }, () => {
      this.isLoading = false;
    });
  }

  cancelOrder(orderId: string) {
    this.isLoading = true;
    this.ordersService.cancelOrder(orderId).subscribe(() => {
      this.ordersService.getOrdersList(this.customerId);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
