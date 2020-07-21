import { Injectable } from "@angular/core";
import { AuthDataRetailer } from './auth-data-retailer.model';
import { AuthDataCustomer } from './auth-data-customer.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })

export class AuthService {
  private customerIsAuthenticated = false;
  private retailerIsAuthenticated = false;
  private token: string;
  private userId: string;
  private tokenTimer: any;
  private shopName: string;
  private userName: string;
  private authuserName = new Subject<string>();
  private who: string;
  private authCustomerListener = new Subject<boolean>();
  private authRetailerListener = new Subject<boolean>();
  private authUserId = new Subject<string>();
  private authShopName = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getCustomerAuth() {
    return this.customerIsAuthenticated;
  }

  getRetailerAuth() {
    return this.retailerIsAuthenticated;
  }

  getAuthCustomerListener() {
    return this.authCustomerListener.asObservable();
  }

  getAuthRetailerListener() {
    return this.authRetailerListener.asObservable();
  }

  createRetailer(fullName: string, shopName: string, mobile: string, email: string, password: string) {
    const authDataRetailer: AuthDataRetailer = {
      fullName: fullName,
      shopName: shopName,
      mobile: mobile,
      email: email,
      password: password
    };
    this.http.post("http://localhost:3000/api/user/signup_retailer", authDataRetailer).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login_retailer']);
    }, error => {
      console.log("Unsuccesfull");
    });
  }

  createCustomer(fullName: string, mobile: string, email: string, password: string) {
    const authDataCustomer: AuthDataCustomer = {
      fullName: fullName,
      mobile: mobile,
      email: email,
      password: password
    }
    this.http.post("http://localhost:3000/api/user/signup_customer", authDataCustomer).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login_customer']);
    }, error => {
      console.log("Unsuccesfull");
    });
  }

  loginRetailer(email: string, password: string) {
    const authData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, userName: string, shopName}>("http://localhost:3000/api/user/login_retailer", authData)
      .subscribe(response => {
        const token = response.token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.retailerIsAuthenticated = true;
          this.userId = response.userId;
          this.shopName = response.shopName;
          this.authShopName.next(response.shopName);
          this.userName = response.userName;
          this.authRetailerListener.next(true);
          this.authuserName.next(response.userName);
          this.authUserId.next(response.userId);
          this.who = "retailer";
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          this.saveAuthData(token, expirationDate, this.userId, this.who, this.userName, this.shopName);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authuserName.next(null);
        this.authUserId.next(null);
        this.authShopName.next(null);
        this.authRetailerListener.next(false);
      });
  }


  loginCustomer(email: string, password: string) {
    const authData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, userName: string}>("http://localhost:3000/api/user/login_customer", authData)
      .subscribe(response => {
        const token = response.token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.customerIsAuthenticated = true;
          this.userId = response.userId;
          this.who = "customer";
          this.userName = response.userName;
          this.authCustomerListener.next(true);
          const now = new Date();
          this.authuserName.next(response.userName);
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          this.saveAuthData(token, expirationDate, this.userId, this.who, this.userName, null);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authuserName.next(null);
        this.authCustomerListener.next(false);
      });
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  getUserName(){
    return this.authuserName.asObservable();
  }

  getShopName(){
    return this.authShopName.asObservable();
  }

  getUserId() {
    return this.authUserId.asObservable();
  }

  logout() {
    this.token = null;
    this.customerIsAuthenticated = false;
    this.retailerIsAuthenticated = false;
    this.authRetailerListener.next(false);
    this.authCustomerListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("who");
    localStorage.removeItem("userName");
    localStorage.removeItem("shopName");
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      const who = authInformation.who;
      if(who === "customer"){
        this.customerIsAuthenticated = true;
        this.authCustomerListener.next(true);
        this.authRetailerListener.next(false);
      }
      else{
        this.retailerIsAuthenticated = true;
        this.authRetailerListener.next(true);
        this.authCustomerListener.next(false);
      }
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const who = localStorage.getItem("who");
    if(!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      who: who
    };
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, who: string, userName: string, shopName: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("who", who);
    localStorage.setItem("userName", userName);
    localStorage.setItem("shopName", shopName);
  }

}
