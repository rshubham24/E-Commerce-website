import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './signup_customer.component.html',
  styleUrls: ['./signup_customer.component.css']
})

export class SignupCustomerComponent{
  showPassword = false;

  showHiddenPassword(e){
    if(this.showPassword === false){
      this.showPassword = true;
    }
    else{
      this.showPassword = false;
    }
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
  }
}
