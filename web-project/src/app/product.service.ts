import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminModel } from './admin.model';
import { ProductModel } from './product-model';
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class ProductService {
  private products: ProductModel[] = [];
  private productsUpdated = new Subject<ProductModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    this.http.get<{message: string, products: any}>("http://localhost:3000/api/product/get_products")
      .pipe(map((productData) => {
        return productData.products.map(product => {
          return {
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            retailerId: product.retailerId,
            shopName: product.shopName,
            id: product._id
          };
        });
      }))
      .subscribe(tranformedData => {
        this.products = tranformedData;
        this.productsUpdated.next([...this.products]);
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

}
