import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login_customer.component.html',
  styleUrls: ['./login_customer.component.css']
})

export class LoginCustomerComponent{
  showPassword = false;

  showHiddenPassword(e){
    if(this.showPassword === false){
      this.showPassword = true;
    }
    else{
      this.showPassword = false;
    }
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
  }


}
