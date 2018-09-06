import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Tabs } from "ionic-angular";
import { HomePage } from "../home/home";
import { ProfilePage } from "../profile/profile";
import { SettingsPage } from "../settings/settings";
import { NotificationsPage } from "../notifications/notifications";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  @ViewChild("myTabs") tabRef: Tabs;
  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = SettingsPage;
  tab4Root = NotificationsPage;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad TabsPage");
  }
  check() {
    this.id = this.tabRef.getSelected().id;
    console.log(this.id);
  }
}
