import { Component, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { UserInfoPage } from "../user-info/user-info";
import { ActivationTokenApi } from "../../../shared/sdk/services/index";
import { CustomerApi } from "../../../shared/sdk/services/index";
import { GlobalService } from "../services/globalServices";
import { LoopBackAuth } from "../../../shared/sdk/services/core/auth.service";
import { SDKToken } from "../../../shared/sdk/models/BaseModels";
import { Customer } from "../../../shared/sdk/models";

/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-verification",
  templateUrl: "verification.html"
})
export class VerificationPage {
  one: number;
  two: number;
  three: number;
  four: number;
  fal: boolean = false;
  result: any;
  token: any;
  response: any;
  password: any;
  username: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public verification: ActivationTokenApi,
    public globalService: GlobalService,
    public customer: CustomerApi,
    public auth: LoopBackAuth
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad VerificationPage");
    this.password = this.navParams.data.password;
    this.username = this.navParams.data.username;
    this.response = this.navParams.data.res;
    console.log("this.response", this.response);
    this.token = this.navParams.data.res.token;
    console.log("password", this.password, "Response", this.response);
    // this.token = JSON.parse(localStorage.getItem("profile")).token;
  }

  changeFocus(id) {
    id.setFocus();
    console.log(this.one, this.two, this.three, this.four);

    if (this.one && this.two && this.three && this.four) {
      this.result = this.one + "" + this.two + "" + this.three + "" + this.four;
      console.log(this.result);
      this.fal = true;
      this.verify(this.result);
    }
  }

  verify(result) {
    var __user = {
      userId: this.response.userId,
      profilepic: this.response.profilepic,
      role: this.response.role,
      smsVerified: true,
      token: this.response.token,
      username: this.response.username
    };
    console.log("CODE SEND", result);
    this.verification.verify(this.token, result).subscribe(res => {
      console.log("Response", res.token);
      if (res.token == "Invalid code") {
        var invalidcode = "Code is invalid!";
        this.globalService.presentToastSuccess(invalidcode);
      } else if (res.token == "Success") {
        var _user = {
          username: this.username,
          password: this.password
        };
        var ver = "User verified!";
        this.globalService.presentToastSuccess(ver);
        this.customer.login(_user).subscribe((token: SDKToken) => {
          // localStorage.setItem("profile", JSON.stringify(token));
          this.navCtrl.push(UserInfoPage);
          if (token.id && token.userId) {
            this.auth.setToken(token);
            this.auth.setRememberMe(true);
            this.auth.save();
            // this.navCtrl.setRoot(TabsPage);
          }
        }),
          err => {
            console.log("ERROR", err);
          },
          () => {
            console.log("success-result");
            // this.navCtrl.setRoot(TabsPage);
          };
      }
    }),
      err => {
        this.globalService.presentToastSuccess(err.message);
        console.log("Error", err);
      };
  }
  resend() {
    this.customer.resendMsg(this.response.username).subscribe(res => {
      console.log("resent", res);
      this.token = res.username;
    });
  }

  login() {
    this.navCtrl.pop();
  }
}
