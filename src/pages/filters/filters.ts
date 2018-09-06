import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the FiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-filters",
  templateUrl: "filters.html"
})
export class FiltersPage {
  fromDate: any;
  toDate: any;
  currentDate: any;
  dCurrentDate: any;
  dDate: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.currentDate = new Date().toISOString();
    this.dCurrentDate = new Date(new Date().setHours(23, 59, 59));

    this.dDate = new Date(new Date().setHours(0, 0, 0));

    this.dDate.setDate(this.dDate.getDate() - 7);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad FiltersPage");
  }

  close() {
    var filter = {
      fromDate: this.dDate,
      toDate: this.dCurrentDate
    };
    this.viewCtrl.dismiss(filter);
  }
  apply() {
    var to = new Date(this.toDate);
    to.setHours(23, 59, 0);
    var from = new Date(this.fromDate);
    from.setHours(0, 0, 0);
    var filter = {
      fromDate: from,
      toDate: to
    };
    this.viewCtrl.dismiss(filter);
  }
}
