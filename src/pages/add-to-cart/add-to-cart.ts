import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  ViewController
} from "ionic-angular";
import { GlobalService } from "../services/globalServices";

/**
 * Generated class for the AddToCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-add-to-cart",
  templateUrl: "add-to-cart.html"
})
export class AddToCartPage {
  count: number = 1;
  added: number;
  max: number;
  remaining: number;
  itemTitle: any;
  item: any;
  rate: any;
  addtocart: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public viewCtrl: ViewController,
    public bucketStorageService: GlobalService
  ) {
    this.itemTitle = navParams.data.Details.title;
    this.item = navParams.data.Details;
    this.rate = navParams.data.Rate;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddToCartPage");
    var index = this.bucketStorageService.bucketCart.findIndex(
      cartItem =>
        cartItem.id === this.item.id &&
        cartItem.sizeInitials === this.rate.sizeInitials
    );
    // && cartItem.id.sizeInitials
    if (index == -1) {
      this.added = 0;
      this.remaining = this.item.maxOrder;
      this.max = this.item.maxOrder;
    } else if (index >= 0) {
      this.added = this.bucketStorageService.bucketCart[index].itemQuantity;
      this.max = this.item.maxOrder;
      this.remaining =
        this.item.maxOrder -
        this.bucketStorageService.bucketCart[index].itemQuantity;
    }
    if (this.remaining == 0) {
      this.count = 0;
      var msg =
        "You cannot order more than " +
        this.item.maxOrder +
        " of this item in a single order";
      this.bucketStorageService.presentToastSuccess(msg);
    }
  }

  addQuantity() {
    if (this.count < this.remaining && this.added < this.max) {
      this.count = this.count + 1;
    } else if (this.remaining == 0) {
      this.count = 0;
      var msg =
        "You cannot order more than " +
        this.item.maxOrder +
        " of this item in a single order";
      this.bucketStorageService.presentToastSuccess(msg);
    } else {
      var msg =
        "You cannot order more than " +
        this.item.maxOrder +
        " of this item in a single order";
      this.bucketStorageService.presentToastSuccess(msg);
    }
  }

  removeQuantity() {
    if (this.count > this.item.minOrder) {
      this.count = this.count - 1;
    }
  }

  addToCartOnly() {
    if (this.count <= this.item.maxOrder) {
      let tempfood = this.item;

      tempfood["itemQuantity"] = this.count;
      tempfood["size"] = this.rate;
      tempfood["sizeInitials"] = this.rate.sizeInitials;
      console.log(tempfood);
      this.bucketStorageService.addBucketItem(Object.assign({}, tempfood));
      this.addtocart = this.bucketStorageService.getCount();
      this.count = 1;
      var msg = "Added to cart successfully!";
      this.bucketStorageService.presentToastSuccess(msg);
      this.viewCtrl.dismiss();
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
