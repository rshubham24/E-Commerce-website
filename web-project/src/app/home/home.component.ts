import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from '../product-model';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy{
  products: ProductModel[] = [];
  isLoading = false;
  private productsSub: Subscription;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProducts();
    this.productsSub = this.productService.getProductUpdateListener()
      .subscribe((products: ProductModel[]) => {
        this.products = products;
        this.isLoading = false;
      })
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
