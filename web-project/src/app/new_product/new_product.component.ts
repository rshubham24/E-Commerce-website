import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-new',
  templateUrl: './new_product.component.html',
  styleUrls: ['./new_product.component.css']
})

export class NewProductComponent{
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
  ]

  onSave(form: NgForm) {
    console.log(form);
  }
}
