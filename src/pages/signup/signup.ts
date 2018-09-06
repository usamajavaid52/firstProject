import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { CustomerApi } from "../../../shared/sdk/services/index";
import { GlobalService } from "../services/globalServices";
import { VerificationPage } from "../verification/verification";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  phoneNumber: any;
  password: any;
  signupResponse: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customer: CustomerApi,
    public loadingCtrl: LoadingController,
    public globalService: GlobalService
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }
  // signup() {
  //   this.navCtrl.push(VerificationPage);
  // }
  signup() {
    var _user = {
      username: this.phoneNumber,
      password: this.password,
      role: "customer"
    };
    let loader = this.loadingCtrl.create({
      content: "Please Wait..."
    });

    loader.present();
    this.customer.create(_user).subscribe(
      res => {
        console.log("Sign up response", res);
        this.signupResponse = res;
        var __user = {
          userId: this.signupResponse.id,
          profilepic: this.signupResponse.profilepic,
          role: this.signupResponse.role,
          smsVerified: this.signupResponse.smsVerified,
          token: this.signupResponse.token,
          username: this.signupResponse.username
        };
        var response = res;

        this.navCtrl.push(VerificationPage, {
          res: __user,
          username: this.phoneNumber,
          password: this.password
        });
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        console.log("ErrorSignUp", err);
        var msg = err.message;
        this.globalService.presentToastSuccess(msg);
      }
    );
  }
}
