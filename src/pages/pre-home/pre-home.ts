import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { PreSigninPage } from "../pre-signin/pre-signin";
import { HomePage } from "../home/home";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

/**
 * Generated class for the PreHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pre-home",
  templateUrl: "pre-home.html"
})
export class PreHomePage {
  public customerUser: Customer = new Customer();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customer: CustomerApi
  ) {
    this.customerUser = customer.getCachedCurrent();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PreHomePage");
    if (this.customerUser && this.customerUser.smsVerified) {
      this.navCtrl.setRoot(TabsPage);
    }
  }

  tabs() {
    this.navCtrl.push(PreSigninPage);
  }
}
