import { Component, OnInit, Injectable } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Events,
  ToastController
} from "ionic-angular";
import { OptionsApi } from "../../../shared/sdk/services/index";

@Injectable()
export class GlobalService {
  bucketCart = [];
  bucktcart = {};
  orderLimit: any;
  languageData: any = "en";
  orderSize: any;
  constructor(public toastCtrl: ToastController, public option: OptionsApi) {
    option.find().subscribe(res => {
      this.orderLimit = res;
      this.orderLimit = this.orderLimit[0].orderSize;
      console.log(this.orderLimit);
    });
  }

  presentToastSuccess(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: "bottom",
      cssClass: "toast-success",
      dismissOnPageChange: true
    });
    toast.present();
  }

  addBucketItem(item) {
    if (this.bucketCart.length > 0) {
      var index = this.bucketCart.findIndex(
        cartItem =>
          cartItem.id === item.id && cartItem.sizeInitials === item.sizeInitials
      );
      console.log("index", index);
      if (index == -1) {
        if (this.bucketCart.length <= this.orderLimit) {
          this.bucketCart.push(item);
        } else if (this.bucketCart.length >= this.orderLimit) {
          var msg = "Order size limit reached!";
          this.presentToastSuccess(msg);
        }
        console.log("if", this.bucketCart);
      } else if (index >= 0) {
        if (this.bucketCart[index].itemQuantity < item.maxOrder) {
          this.bucketCart[index].itemQuantity =
            this.bucketCart[index].itemQuantity + item.itemQuantity;
        }
        console.log("else", this.bucketCart);
      }
    } else if (this.bucketCart.length == 0) {
      this.bucketCart.push(item);
    }
  }
  getCount() {
    return this.bucketCart.length;
  }
  editBucketItem(index, item) {
    this.bucketCart[index] = item;
  }
  remove(index) {
    this.bucketCart.splice(index, 1);
  }
}
