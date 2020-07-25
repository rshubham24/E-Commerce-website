import { Component, OnInit, OnDestroy} from '@angular/core';
import { OrdersService } from '../orders.service';
import { OrdersModel } from '../orders.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit, OnDestroy{
  orders: OrdersModel[] = [];
  private ordersSub: Subscription;
  customerId: string;
  isLoading = false;

  constructor(private ordersService: OrdersService) {}


  ngOnInit() {
    this.isLoading = true;
    this.customerId = localStorage.getItem("userId");
    this.ordersService.getAllOrders();
    this.ordersSub = this.ordersService.getOrdersUpdateListener()
      .subscribe((orders: OrdersModel[]) => {
        this.orders = orders;
        this.isLoading = false;
      });
  }

  date(time: number){
    const expectedDate = new Date(time);
    const date = expectedDate.getDate();
    const month = expectedDate.getMonth();
    const year = expectedDate.getFullYear();
    return date + "/" + month + '/' + year;
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }

}
