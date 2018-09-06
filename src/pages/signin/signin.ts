import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { CustomerApi } from "../../../shared/sdk/services/index";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { GlobalService } from "../services/globalServices";
import { SignupPage } from "../signup/signup";
import { VerificationPage } from "../verification/verification";
import { LoopBackAuth } from "../../../shared/sdk/services/core/auth.service";
import { SDKToken } from "../../../shared/sdk/models/BaseModels";
import { Customer } from "../../../shared/sdk/models";

@IonicPage()
@Component({
  selector: "page-signin",
  templateUrl: "signin.html"
})
export class SigninPage {
  username: any;
  password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customer: CustomerApi,
    public loadingCtrl: LoadingController,
    public globalService: GlobalService,
    private auth: LoopBackAuth
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SigninPage");
  }

  login() {
    var _user = {
      username: this.username,
      password: this.password
    };
    let loader = this.loadingCtrl.create({
      content: "Please Wait..."
    });

    loader.present();
    this.customer.login(_user).subscribe(
      (token: SDKToken) => {
        console.log(token);
        if (token.id && token.userId && token.user.smsVerified) {
          this.auth.setToken(token);
          this.auth.setRememberMe(true);
          this.auth.save();

          // this.navCtrl.setRoot(TabsPage);
        } else if (!token.user.smsVerified) {
          var msg1 = "Phone number not verified!";
          this.globalService.presentToastSuccess(msg1);
          this.navCtrl.push(VerificationPage, {
            res: token,
            username: this.username,
            password: this.password
          });
        }
        loader.dismiss();
      },
      err => {
        console.log("Error:", err);

        this.globalService.presentToastSuccess(err.message);

        loader.dismiss();
      },
      () => {
        var msg = "Logged in successfully!";
        this.globalService.presentToastSuccess(msg);
        console.log("success-result");
        this.navCtrl.setRoot(TabsPage);
      }
    );
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
