import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  LoadingController
} from "ionic-angular";
import { FiltersPage } from "../filters/filters";
import { NotificationsLogApi } from "../../../shared/sdk/services/index";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-notifications",
  templateUrl: "notifications.html"
})
export class NotificationsPage {
  notifications: any;
  dCurrentDate: any;
  dDate: any;
  filteredNotifications: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public notificationsLog: NotificationsLogApi,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad NotificationsPage");
    this.dCurrentDate = new Date(new Date().setHours(23, 59, 59));

    this.dDate = new Date(new Date().setHours(0, 0, 0));

    this.dDate.setDate(this.dDate.getDate() - 7);
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.notificationsLog.find().subscribe(
      res => {
        var i = 1;
        this.notifications = res;
        for (let items of this.notifications) {
          var date = new Date(items.createdDateTime);

          i++;
          if (date <= this.dCurrentDate && date >= this.dDate) {
            this.filteredNotifications.push(items);
          }
          if (i == this.notifications.length) {
            loader.dismiss();
          }
        }
      },
      err => {
        console.error("Error", err);
      }
    );
  }

  openFilters() {
    let modal = this.modalCtrl.create(FiltersPage);
    modal.onDidDismiss(data => {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      var i = 1;
      this.filteredNotifications = [];
      if (data.toDate == "Invalid Date") {
        data.toDate = this.dCurrentDate;
      }

      for (let items of this.notifications) {
        var date = new Date(items.createdDateTime);

        i++;
        if (date <= data.toDate && date >= data.fromDate) {
          this.filteredNotifications.push(items);
        }
        if (i == this.notifications.length) {
          loader.dismiss();
        }
      }
    });
    modal.present();
  }
}
