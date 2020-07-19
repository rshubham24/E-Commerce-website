import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login_retailer.component.html',
  styleUrls: ['./login_retailer.component.css']
})

export class LoginRetailerComponent implements OnDestroy, OnInit{
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
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.loginRetailer(
      form.value.email,
      form.value.password
    )
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
