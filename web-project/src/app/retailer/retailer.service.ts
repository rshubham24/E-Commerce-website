import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';

@Injectable({ providedIn: "root" })

export class RetailerService {

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

}
