import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { CartIdModel } from '../cart_id.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping_cart.component.html',
  styleUrls: ['./shopping_cart.component.css']
})

export class ShoppingCartComponent implements OnInit, OnDestroy{
  private customerId: string;
  isLoading = false;
  total = 0;
  private productSub: Subscription;
  cartItems: CartIdModel[] = [];
  private totalSub: Subscription;

  constructor(public route: ActivatedRoute, public cartService: CartService, public dialog: MatDialog) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.customerId = params['id'];
      this.isLoading = true;
    });
    this.cartService.getCartItem(this.customerId);
    this.productSub = this.cartService.getCartItemListener()
      .subscribe((item: CartIdModel[]) => {
        this.cartItems = item;
    });
    this.totalSub = this.cartService.getTotal().subscribe(total => {
      this.total = total;
      this.isLoading = false;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsDialog, { height: '500px', width: '410px' });
    dialogRef.afterClosed().subscribe(result => {
      if(result === "original"){
        result = null;
        this.placeOrder(result);
      }
      else if(!result){

      }
      else{
        this.placeOrder(result);
      }
    });
  }

  onDelete(item: CartIdModel) {
    this.total = this.total - item.price*item.quantity;
    this.isLoading = true;
    this.cartService.deleteItem(item.id).subscribe(() => {
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
    });
  }

  onUpdateMinus(item: CartIdModel) {
    if(item.quantity === 1){
      this.onDelete(item);
      this.total = this.total - item.price;
    }
    else{
      item.quantity = item.quantity - 1;
      this.total = this.total - item.price;
      this.cartService.updateItem(item);
    }
  }

  onUpdateAdd(item: CartIdModel) {
    this.total = this.total + item.price;
    item.quantity = item.quantity + 1;
    this.cartService.updateItem(item);
  }

  placeOrder(check: NgForm) {
    if(check){
      this.cartService.placeOrder(
        this.cartItems,
        localStorage.getItem("mobile"),
        check.value.streetAdress,
        check.value.city,
        check.value.state,
        check.value.country,
        check.value.pinCode
        )
        .subscribe(response => {
          this.isLoading = true;
          this.cartService.deleteAllItem(this.customerId).subscribe(() => {
            this.cartService.getCartItem(this.customerId);
          }, () => {
            this.isLoading = false;
          });
        });
    }
    else{
      this.cartService.placeOrder(
        this.cartItems,
        localStorage.getItem("mobile"),
        localStorage.getItem("streetAdress"),
        localStorage.getItem("city"),
        localStorage.getItem("state"),
        localStorage.getItem("country"),
        +localStorage.getItem("pinCode"),
        )
        .subscribe(response => {
          this.isLoading = true;
          this.cartService.deleteAllItem(this.customerId).subscribe(() => {
            this.cartService.getCartItem(this.customerId);
          }, () => {
            this.isLoading = false;
          });
        });
      }
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.totalSub.unsubscribe();
  }
}


@Component({
  selector: 'dialog-elements',
  templateUrl: 'dialog.html'
})
export class DialogElementsDialog {
  userName = localStorage.getItem("userName");
  streetAdress = localStorage.getItem("streetAdress");
  citye = localStorage.getItem("city");
  statee = localStorage.getItem("state");
  countrye = localStorage.getItem("country");
  pinCodee = localStorage.getItem("pinCode");

  constructor(public dialogRef: MatDialogRef<DialogElementsDialog>) {}

  onNoClick(s: string) {
    console.log(s);
    this.dialogRef.close(s);
  }

  submit(form: NgForm){
    this.dialogRef.close(form);
  }

}
