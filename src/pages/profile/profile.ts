import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  LoadingController,
  App
} from "ionic-angular";
import { HomePage } from "../home/home";
import { SettingsPage } from "../settings/settings";
import { UserInfoPage } from "../user-info/user-info";
import { Customer } from "../../../shared/sdk/models";

import {
  CustomerApi,
  FavouriteApi,
  GlobalsApi
} from "../../../shared/sdk/services/index";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  user: any;
  fvrt: any;
  loaded: boolean = false;
  userInfo: any;
  public customerUser: Customer = new Customer();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public customer: CustomerApi,
    public favourite: FavouriteApi,
    public loadingCtrl: LoadingController,
    public global: GlobalsApi,
    public app: App
  ) {
    this.customerUser = customer.getCachedCurrent();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProfilePage");

    // var pro = document.getElementById("profile");
    // pro.classList.add("ProfileFooter");
  }
  ionViewDidEnter() {
    this.userData();
    let loader = this.loadingCtrl.create({
      content: "Please Wait..."
    });

    loader.present();
    this.customer
      .find({
        where: { id: this.customerUser.id }
      })
      .subscribe(res => {
        this.user = res[0];
      }),
      err => {
        console.log("Error", err);
      };
    this.favourite
      .find({
        where: { userId: this.customerUser.id }
      })
      .subscribe(res => {
        console.log(res.length);
        this.fvrt = res.length;
        loader.dismiss();
        this.loaded = true;
      });
  }
  // goToSettings() {
  //   var pro = document.getElementById("profile");
  //   pro.classList.remove("ProfileFooter");
  //   let modal = this.modalCtrl.create(SettingsPage);
  //   modal.present();
  // }

  userData() {
    this.global
      .find({
        where: { userId: this.customerUser.id }
      })
      .subscribe(res => {
        console.log("UserData", res);
        this.userInfo = res[0];
      });
  }
  dismiss() {
    this.navCtrl.parent.select(0);
    // this.viewCtrl.dismiss();
  }
  swipeUp(event: any): any {
    this.dismiss();
  }

  swipeDown(event: any): any {
    this.dismiss();
  }
  swipeLeft(event: any): any {
    this.dismiss();
  }
  swipeRight(event: any): any {
    this.dismiss();
  }
  update() {
    this.app.getRootNav().push(UserInfoPage);
  }
}
