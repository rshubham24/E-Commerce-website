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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.customerIsAuthenticated = this.authService.getCustomerAuth();
    this.retailerIsAuthenticated = this.authService.getRetailerAuth();
    this.authCustomerListenerSub = this.authService.getAuthCustomerListener().subscribe(isAuthenticated => {
      this.customerIsAuthenticated = isAuthenticated;
    });
    this.authRetailerListenerSub = this.authService.getAuthRetailerListener().subscribe(isAuthenticated => {
      this.retailerIsAuthenticated = isAuthenticated;
    })
  }

  onLogout() {
    console.log("hi");
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authCustomerListenerSub.unsubscribe();
    this.authCustomerListenerSub.unsubscribe();
  }

}
