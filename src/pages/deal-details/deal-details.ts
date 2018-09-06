import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-deal-details",
  templateUrl: "deal-details.html"
})
export class DealDetailsPage {
  deal: any;
  scrollAmount = 0;
  headerTop: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public viewCtrl: ViewController
  ) {
    console.log(this.navParams.data);
    this.deal = this.navParams.data.deal;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DealDetailsPage");
  }

  scrollHandler(event) {
    console.log(event);
    this.zone.run(() => {
      this.scrollAmount = event.scrollTop;
      if (event.scrollTop < 142) {
        this.headerTop = true;
      } else if (event.scrollTop >= 142) {
        this.headerTop = false;
      }
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  swipeAll(event: any): any {
    this.dismiss();
  }

  swipeLeft(event: any): any {
    this.dismiss();
  }

  swipeRight(event: any): any {
    this.dismiss();
  }

  swipe(event) {
    if (event.additionalEvent === "pandown" && this.scrollAmount == 0) {
      this.dismiss();
    }
  }
}
