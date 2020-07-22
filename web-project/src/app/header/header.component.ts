import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  customerIsAuthenticated = false;
  retailerIsAuthenticated = false;
  private authCustomerListenerSub: Subscription;
  private authRetailerListenerSub: Subscription;
  private authUserName: Subscription;
  private authUserId: Subscription;
  userName: string;
  userId: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem("userName");
    this.userId = localStorage.getItem("userId");
    this.customerIsAuthenticated = this.authService.getCustomerAuth();
    this.retailerIsAuthenticated = this.authService.getRetailerAuth();
    this.authCustomerListenerSub = this.authService.getAuthCustomerListener().subscribe(isAuthenticated => {
      this.customerIsAuthenticated = isAuthenticated;
    });
    this.authRetailerListenerSub = this.authService.getAuthRetailerListener().subscribe(isAuthenticated => {
      this.retailerIsAuthenticated = isAuthenticated;
    });
    this.authUserName = this.authService.getUserName().subscribe(user => {
      this.userName = user;
    })
    this.authUserId = this.authService.getUserId().subscribe(user => {
      this.userId = user;
    })
  }

  redirect(){
    if(this.customerIsAuthenticated){
      this.router.navigate(['/home/' + this.userId]);
    }
    else{
      this.router.navigate(['/']);
    }
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authCustomerListenerSub.unsubscribe();
    this.authRetailerListenerSub.unsubscribe();
    this.authUserName.unsubscribe();
    this.authUserId.unsubscribe();
  }

}
