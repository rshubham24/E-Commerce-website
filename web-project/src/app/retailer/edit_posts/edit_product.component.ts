import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RetailerService } from '../retailer.service';
import { ProductModel } from 'src/app/product-model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new',
  templateUrl: './edit_product.component.html',
  styleUrls: ['./edit_product.component.css']
})

export class EditProductComponent implements OnInit, OnDestroy{
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
  private productId: string;
  isLoading = false;
  product: ProductModel;
  private productSub: Subscription;

  constructor(private retailerService: RetailerService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'];
      this.isLoading = true;
      this.productSub = this.retailerService.getProduct(this.productId).subscribe(prod => {
        this.product = {
          title:prod.title,
          price: prod.price,
          category: prod.category,
          imageUrl: prod.imageUrl,
          retailerId: prod.retailerId,
          shopName: prod.shopName,
          id: prod._id
        };
        this.isLoading = false;
      });
    });
  }

  onUpdate(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.retailerService.updateProduct(
      this.product.id,
      form.value.title,
      form.value.price,
      form.value.category,
      form.value.imageUrl,
      this.product.retailerId,
      this.product.shopName
      );
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

}
