import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login_shopkeeper.component.html',
  styleUrls: ['./login_shopkeeper.component.css']
})

export class LoginShopkeeperComponent{
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
