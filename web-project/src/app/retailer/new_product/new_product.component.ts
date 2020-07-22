import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { RetailerService } from '../retailer.service';


@Component({
  selector: 'app-new',
  templateUrl: './new_product.component.html',
  styleUrls: ['./new_product.component.css']
})

export class NewProductComponent implements OnDestroy, OnInit{
  Category = [
    "Bevarages",
    "Bread",
    "Choclates",
    "Condiments",
    "Fruits",
    "Grains",
    "Herbs & Spices",
    "Ice-Cream",
    "Meat & Fish",
    "Pulses",
    "Snacks",
    "Vegetables"
  ];
  private authShopName: Subscription;
  private authUserId: Subscription;
  shopName: string;
  userId: string;

  constructor(private authService: AuthService, private retailerService: RetailerService) {}

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.shopName = localStorage.getItem("shopName");
    this.authShopName = this.authService.getShopName().subscribe(name => {
      this.shopName = name;
    });
    this.authUserId = this.authService.getUserId().subscribe(user => {
      this.userId = user;
    });
  }

  onSave(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.retailerService.addProduct(
      form.value.title,
      form.value.price,
      form.value.category,
      form.value.imageUrl,
      this.userId,
      this.shopName
      );
  }

  ngOnDestroy() {
    this.authUserId.unsubscribe();
    this.authShopName.unsubscribe();
  }
}
