import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/product-model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { RetailerService } from '../retailer.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage',
  templateUrl: './manage_products.component.html',
  styleUrls: ['./manage_products.component.css']
})

export class ManageProductsComponent implements OnInit, OnDestroy{
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  products: ProductModel[] = [];
  private productsSub: Subscription;
  private authUserId: Subscription;
  userId: string;
  isLoading = false;

  constructor(private authService: AuthService, private retailerService: RetailerService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.isLoading = true;
    this.userId = localStorage.getItem("userId");
    this.authUserId = this.authService.getUserId().subscribe(user => {
      this.userId = user;
    });
    this.retailerService.getProductsList(this.userId);
    this.productsSub = this.retailerService.getProductUpdateListener()
      .subscribe((products: ProductModel[]) => {
        this.products = products;
        this.isLoading = false;
      });
  }

  onEdit(productId: string){
    this.retailerService.editProduct(productId);
  }

  onDelete(productId: string) {
    this.isLoading = true;
    this.retailerService.deleteProduct(productId).subscribe(() => {
      this.snackBar.open('Item removed!!', 'Ok', {
        duration: 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.retailerService.getProductsList(this.userId);
    }, () => {
      this.isLoading = false;
    });
  }


  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authUserId.unsubscribe();
  }

}
