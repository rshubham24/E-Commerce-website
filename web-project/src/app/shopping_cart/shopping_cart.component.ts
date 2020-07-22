import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartIdModel } from '../cart_id.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping_cart.component.html',
  styleUrls: ['./shopping_cart.component.css']
})

export class ShoppingCartComponent implements OnInit, OnDestroy{
  private customerId: string;
  isLoading = false;
  private productSub: Subscription;
  cartItems: CartIdModel[] = [];

  constructor(public route: ActivatedRoute, public cartService: CartService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.customerId = params['id'];
      this.isLoading = true;
    });
    this.cartService.getCartItem(this.customerId);
    this.productSub = this.cartService.getCartItemListener()
      .subscribe((item: CartIdModel[]) => {
        this.cartItems = item;
        this.isLoading = false;
    });
  }

  onDelete(productId: string) {
    this.isLoading = true;
    this.cartService.deleteItem(productId).subscribe(() => {
      this.cartService.getCartItem(this.customerId);
    }, () => {
      this.isLoading = false;
    });
  }

  clearCart() {
    this.isLoading = true;
    this.cartService.deleteAllItem(this.customerId).subscribe(() => {
      this.cartService.getCartItem(this.customerId);
    }, () => {
      this.isLoading = false;
    })
  }



  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

}
