import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login_admin.component.html',
  styleUrls: ['./login_admin.component.css']
})

export class LoginAdminComponent implements OnInit, OnDestroy{
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

  constructor(public authService: AuthService ) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthAdminListener().subscribe(
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
    this.authService.loginAdmin(
      form.value.email,
      form.value.password
    )
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
