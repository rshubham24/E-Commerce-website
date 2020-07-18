import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './signup_shopkeeper.component.html',
  styleUrls: ['./signup_shopkeeper.component.css']
})

export class SignupShopkeeperComponent{
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
