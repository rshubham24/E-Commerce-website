import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup_customer.component.html',
  styleUrls: ['./signup_customer.component.css']
})

export class SignupCustomerComponent implements OnInit, OnDestroy{
  showPassword = false;
  isLoading = false;
  private authStatusSub: Subscription;

  showHiddenPassword(e){
    if(this.showPassword === false){
      this.showPassword = true;
    }
    else{
      this.showPassword = false;
    }
  }

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthCustomerListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createCustomer(
      form.value.fullName,
      form.value.mobile,
      form.value.email,
      form.value.password,
      form.value.streetAdress,
      form.value.city,
      form.value.state,
      form.value.country,
      form.value.pinCode,
      );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
