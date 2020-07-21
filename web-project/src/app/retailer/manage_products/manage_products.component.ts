import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/product-model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RetailerService } from '../retailer.service';


@Component({
  selector: 'app-manage',
  templateUrl: './manage_products.component.html',
  styleUrls: ['./manage_products.component.css']
})

export class ManageProductsComponent implements OnInit, OnDestroy{
  products: ProductModel[] = [];
  private productsSub: Subscription;
  private authUserId: Subscription;
  userId: string;
  isLoading = false;

  constructor(private authService: AuthService, private retailerService: RetailerService) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = localStorage.getItem("userId");
    this.authUserId = this.authService.getUserId().subscribe(user => {
      this.userId = user;
    });
    this.retailerService.getProductsList(this.userId);
    this.productsSub = this.retailerService.getProductUpdateListener()
      .subscribe((products: ProductModel[]) => {
        console.log(products);
        this.products = products;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authUserId.unsubscribe();
  }

}
