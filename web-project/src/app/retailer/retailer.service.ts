import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { ProductModel } from '../product-model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })

export class RetailerService {
  private products: ProductModel[] = [];
  private productsUpdated = new Subject<ProductModel[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addProduct(title: string, price: number, category: string, imageUrl: string, retailerId: string, shopName: string) {
    const product: Product = {
      title: title,
      price: price,
      category: category,
      imageUrl: imageUrl,
      retailerId: retailerId,
      shopName: shopName
    }
    this.http.post("http://localhost:3000/api/retailer/add_product", product).subscribe(response => {
      console.log(response);
      this.router.navigate(['/manage', retailerId]);
    }, error => {
      console.log("product not added");
    });
  }

  getProductsList(retailerId: string) {
    this.http.get<{message: string, products: any}>("http://localhost:3000/api/product/get_products_list/" + retailerId)
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
