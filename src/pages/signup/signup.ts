import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoadingController } from "ionic-angular";
import { AuthService } from "../../services/auth";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController) {}

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signin you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)

  }
}
