import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup_retailer.component.html',
  styleUrls: ['./signup_retailer.component.css']
})

export class SignupRetailerComponent implements OnInit, OnDestroy{
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
    this.authStatusSub = this.authService.getAuthRetailerListener().subscribe(
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
    this.authService.createRetailer(
      form.value.fullName,
      form.value.shopName,
      form.value.mobile,
      form.value.email,
      form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
