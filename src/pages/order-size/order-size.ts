import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

/**
 * Generated class for the OrderSizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-order-size",
  templateUrl: "order-size.html"
})
export class OrderSizePage {
  rates: any;
  size: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.rates = navParams.data.rates;
    console.log("Rates", this.rates);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderSizePage");
  }
  check() {
    this.viewCtrl.dismiss(this.size);
    console.log(this.size);
  }
  back() {
    this.viewCtrl.dismiss();
  }
}
