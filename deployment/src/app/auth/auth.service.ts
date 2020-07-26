import { Injectable } from "@angular/core";
import { AuthDataRetailer } from './auth-data-retailer.model';
import { AuthDataCustomer } from './auth-data-customer.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const Backend_Url = environment.api_Url;

@Injectable({ providedIn: "root" })

export class AuthService {
  private customerIsAuthenticated = false;
  private retailerIsAuthenticated = false;
  private adminIsAuthenticated = false;
  private token: string;
  private userId: string;
  private tokenTimer: any;
  private shopName: string;
  private userName: string;
  private streetAdress: string;
  private city: string;
  private state: string;
  private country: string;
  private pinCode: string;
  private mobile: string;
  private authuserName = new Subject<string>();
  private who: string;
  private authCustomerListener = new Subject<boolean>();
  private authRetailerListener = new Subject<boolean>();
  private authAdminListener = new Subject<boolean>();
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

  getAdminAuth() {
    return this.adminIsAuthenticated;
  }

  getAuthAdminListener() {
    return this.authAdminListener.asObservable();
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
    this.http.post(Backend_Url + "/user/signup_retailer", authDataRetailer).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login_retailer']);
    }, error => {
      this.authRetailerListener.next(false);
    });
  }

  createCustomer(fullName: string, mobile: string, email: string, password: string, streetAdress: string, city: string, state: string, country: string, pinCode: number) {
    const authDataCustomer: AuthDataCustomer = {
      fullName: fullName,
      mobile: mobile,
      email: email,
      password: password,
      streetAdress: streetAdress,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode
    }
    console.log(authDataCustomer);
    this.http.post(Backend_Url + "/user/signup_customer", authDataCustomer).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login_customer']);
    }, error => {
      this.authCustomerListener.next(false);
    });
  }

  loginAdmin(email: string, password: string) {
    const authData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userName: string}>(Backend_Url + "/user/login_admin", authData)
      .subscribe(response => {
        const token = response.token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.adminIsAuthenticated = true;
          this.userName = response.userName;
          this.authAdminListener.next(true);
          this.authuserName.next(response.userName);
          this.who = "admin";
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          this.saveAuthData(token, expirationDate, null, this.who, this.userName, null, null, null, null, null, null, null);
          this.router.navigate(['/admin']);
        }
      }, error => {
        this.authAdminListener.next(false);
      });
  }

  loginRetailer(email: string, password: string) {
    const authData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string, userName: string, shopName: string}>(Backend_Url + "/user/login_retailer", authData)
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
          this.saveAuthData(token, expirationDate, this.userId, this.who, this.userName, this.shopName, null, null, null, null, null, null);
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
    this.http.post<{token: string, expiresIn: number, userId: string, userName: string, mobile: string, streetAdress: string, city: string, state: string, country: string, pinCode: number}>(Backend_Url + "/user/login_customer", authData)
      .subscribe(response => {
        const token = response.token;
        if(token){
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.customerIsAuthenticated = true;
          this.userId = response.userId;
          this.who = "customer";
          this.userName = response.userName;
          this.mobile = response.mobile;
          this.streetAdress = response.streetAdress;
          this.city = response.city;
          this.state = response.state;
          this.country = response.country;
          this.pinCode = response.pinCode.toString();
          this.authCustomerListener.next(true);
          const now = new Date();
          this.authuserName.next(response.userName);
          const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
          this.saveAuthData(token, expirationDate, this.userId, this.who, this.userName, null, this.mobile, this.streetAdress, this.city, this.state, this.country, this.pinCode);
          this.router.navigate(['/home/' + this.userId]);
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
    this.adminIsAuthenticated = false;
    this.authAdminListener.next(false);
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
    localStorage.removeItem("mobile");
    localStorage.removeItem("streetAdress");
    localStorage.removeItem("city");
    localStorage.removeItem("state");
    localStorage.removeItem("country");
    localStorage.removeItem("pinCode");
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
        this.authAdminListener.next(false);
      }
      else if(who === "retailer"){
        this.retailerIsAuthenticated = true;
        this.authRetailerListener.next(true);
        this.authCustomerListener.next(false);
        this.authAdminListener.next(false);
      }
      else{
        this.adminIsAuthenticated = true;
        this.authAdminListener.next(true);
        this.authCustomerListener.next(false);
        this.authRetailerListener.next(false);
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

  private saveAuthData(token: string, expirationDate: Date, userId: string, who: string, userName: string, shopName: string, mobile: string, streetAdress: string, city: string, state: string, country: string, pinCode: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("who", who);
    localStorage.setItem("userName", userName);
    localStorage.setItem("shopName", shopName);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("streetAdress", streetAdress);
    localStorage.setItem("city", city);
    localStorage.setItem("state", state);
    localStorage.setItem("country", country);
    localStorage.setItem("pinCode", pinCode);
  }

}
