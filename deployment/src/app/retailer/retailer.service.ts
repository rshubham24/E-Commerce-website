import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';
import { map } from 'rxjs/operators';
import { ProductModel } from '../product-model';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const Backend_Url = environment.api_Url;

@Injectable({ providedIn: "root" })

export class RetailerService {
  private products: ProductModel[] = [];
  private product: ProductModel;
  editProductInfo: ProductModel;
  private productsUpdated = new Subject<ProductModel[]>();
  private productUpdated = new Subject<ProductModel>();

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
    this.http.post(Backend_Url + "/retailer/add_product", product).subscribe(response => {
      console.log(response);
      this.router.navigate(['/manage', retailerId]);
    }, error => {
      console.log("product not added");
    });
  }

  updateProduct(productId: string, title: string, price: number, category: string, imageUrl: string, retailerId: string, shopName: string) {
    let productData: ProductModel;
    productData = {
      title: title,
      price: price,
      category: category,
      imageUrl: imageUrl,
      retailerId: retailerId,
      shopName: shopName,
      id: productId
    }
    this.http.put(Backend_Url + "/product/update/" + productId, productData).subscribe(response => {
      this.router.navigate(["/manage/" + retailerId]);
    });
  }

  getProductsList(retailerId: string) {
    this.http.get<{message: string, products: any}>(Backend_Url + "/product/get_products_list/" + retailerId)
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

  editProduct(productId: string) {
    this.router.navigate(['/edit/' + productId]);
  }

  getProduct(productId: string) {
  return this.http.get<{
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
    retailerId: string;
    shopName: string;
  }>(Backend_Url + "/product/get_product/" + productId);
  }

  deleteProduct(productId: string) {
    return this.http.delete(Backend_Url + "/product/delete/" + productId);
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

}
