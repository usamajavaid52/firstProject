import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { GlobalService } from "../services/globalServices";

/**
 * Generated class for the EditCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-cart",
  templateUrl: "edit-cart.html"
})
export class EditCartPage {
  index: any;
  item: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public globalData: GlobalService
  ) {
    console.log(navParams.data);
    this.index = navParams.data.index;
    this.item = navParams.data.item;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditCartPage");
  }
  closeModal(index) {
    this.globalData.remove(index);
    this.viewCtrl.dismiss();
  }
  close() {
    this.viewCtrl.dismiss();
  }
  addQuantity(index, item) {
    if (item.itemQuantity <= item.maxOrder) {
      item.itemQuantity = item.itemQuantity + 1;

      this.globalData.editBucketItem(index, item);
    }
  }

  removeQuantity(index, item) {
    console.log("Item Quantity", item.itemQuantity);
    if (item.itemQuantity > item.minOrder) {
      item.itemQuantity = item.itemQuantity - 1;

      this.globalData.editBucketItem(index, item);
    }
    if (item.itemQuantity == 0 && this.globalData.bucketCart.length == 0) {
      this.globalData.bucketCart = [];
    }
  }
}
