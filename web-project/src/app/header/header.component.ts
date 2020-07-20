import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


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
  userName: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = localStorage.getItem("userName");
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
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authCustomerListenerSub.unsubscribe();
    this.authRetailerListenerSub.unsubscribe();
  }

}
