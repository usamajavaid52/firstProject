import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  LoadingController
} from "ionic-angular";
import { CustomerApi } from "../../../shared/sdk/services/index";
import { PreSigninPage } from "../pre-signin/pre-signin";
import { SigninPage } from "../signin/signin";
import { AboutUsPage } from "../about-us/about-us";
import { LanguagePage } from "../language/language";
import { GlobalService } from "../services/globalServices";
import { AppRate } from "@ionic-native/app-rate";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  lan: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public customerApi: CustomerApi,
    public app: App,
    public loadingCtrl: LoadingController,
    public globalData: GlobalService,
    private appRate: AppRate
  ) {
    this.lan = this.globalData.languageData;
  }
  ngDoCheck() {
    console.log("ionViewDidLoad SettingsPage");
    this.lan = this.globalData.languageData;
    // console.log(this.lan);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
    this.lan = this.globalData.languageData;
    // console.log(this.lan);
  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter SettingsPage");
    this.lan = this.globalData.languageData;
    // console.log("WillEnter", this.lan);
  }
  ionViewDidEnter() {
    console.log("ionViewDidEnter SettingsPage");
    this.lan = this.globalData.languageData;
    // console.log("DidEnter", this.lan);
  }
  aboutUs() {
    this.app.getRootNav().push(AboutUsPage);
    //this.app.getRootNav is used to push some page when using ion-tabs
  }
  language() {
    // this.navCtrl.push(LanguagePage);
    this.app.getRootNav().push(LanguagePage);
  }

  rateApp() {
    this.appRate.preferences = {
      usesUntilPrompt: 3,
      storeAppURL: {
        ios: "<app_id>",
        android: "market://details?id=<package_name>",
        windows: "ms-windows-store://review/?ProductId=<store_id>"
      }
    };

    this.appRate.promptForRating(true);
  }

  logout() {
    let loader = this.loadingCtrl.create({
      content: "Logging out...",
      dismissOnPageChange: true
    });
    loader.present();

    this.customerApi.logout().subscribe(
      res => {
        console.log("LogOut", res);

        // localStorage.removeItem("profile");
        loader.dismiss();
        this.app.getRootNav().setRoot(PreSigninPage);
      },
      err => {
        console.log("Error", err);
      }
    );
  }
}
