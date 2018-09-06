import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  AlertController
} from "ionic-angular";
import { GlobalService } from "../services/globalServices";
import { OptionsApi } from "../../../shared/sdk/services/index";
import { EditCartPage } from "../edit-cart/edit-cart";
import { OrderApi } from "../../../shared/sdk/services/custom/index";
import { Geolocation } from "@ionic-native/geolocation";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

// import {
//   NativeGeocoder,
//   NativeGeocoderReverseResult,
//   NativeGeocoderForwardResult
// } from "@ionic-native/native-geocoder";

// import * as _ from "lodash";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  cartItems: any;
  cartLength: Number;
  subTotal: number;
  deliveryFee: number;
  gst: number;
  data: any;
  finalTotal: number;
  userLocation: any;
  public customerUser: Customer = new Customer();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public bucketService: GlobalService,
    public options: OptionsApi,
    public order: OrderApi,
    public geolocation: Geolocation, // private nativeGeocoder: NativeGeocoder
    public customer: CustomerApi,
    public alertCtrl: AlertController
  ) {
    this.customerUser = customer.getCachedCurrent();
    this.calcluateSubTotal();
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        console.log("Location", resp);
        // this.nativeGeocoder
        //   .reverseGeocode(resp.coords.latitude, resp.coords.longitude)
        //   .then((result: NativeGeocoderReverseResult) =>
        //     console.log(JSON.stringify(result))
        //   )
        //   .catch((error: any) => console.log(error));
        // resp.coords.latitude
        // resp.coords.longitude
        this.userLocation = resp.coords;
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CartPage");
    this.globalData();

    this.calcluateSubTotal();
    this.cartItems = this.bucketService.bucketCart;
    this.cartLength = this.cartItems.length;
  }
  ngDoCheck() {
    this.calcluateSubTotal();
    this.cartItems = this.bucketService.bucketCart;
    this.cartLength = this.cartItems.length;
  }

  globalData() {
    this.options.find().subscribe(res => {
      this.data = res;
      this.deliveryFee = this.data[0].deliveryFee;
      this.gst = this.data[0].gst;
    });
  }

  calcluateSubTotal() {
    if (this.bucketService.bucketCart.length > 0) {
      var sum = 0;
      var items = this.bucketService.bucketCart;
      for (let item of items) {
        sum = sum + item.itemQuantity * item.size.price;
      }
      this.subTotal = sum;
    }
  }

  editCart(i, item) {
    let modal = this.modalCtrl.create(EditCartPage, {
      index: i,
      item: item
    });
    modal.onDidDismiss(() => {
      this.calcluateSubTotal();
      this.cartLength = this.cartItems.length;
    });
    modal.present();
  }
  removeItem(index) {
    this.bucketService.remove(index);
    this.navCtrl.push(CartPage).then(() => {
      const index = this.navCtrl.getActive().index;
      this.navCtrl.remove(index - 1);
    });
  }
  checkOut() {
    if (this.userLocation) {
      if (!this.customerUser.phone) {
        let alert = this.alertCtrl.create({
          title: "Please enter your Phone Number!",
          inputs: [
            {
              name: "phoneNo",
              placeholder: "Phone No.",
              type: "tel"
            }
          ],
          buttons: [
            {
              text: "Enter",
              role: "cancel",
              handler: data => {
                this.customerUser.phone = data.phoneNo;
                console.log("Cancel clicked", this.customerUser.phone);
              }
            }
          ]
        });
        alert.present();
      }
      if (this.customerUser.phone) {
        var order = {
          cartItems: this.cartItems,
          subTotal:
            (this.subTotal + this.deliveryFee) * this.gst +
            (this.subTotal + this.deliveryFee),
          userId: this.customerUser.id,
          firstname: this.customerUser.firstname,
          lastname: this.customerUser.lastname,
          phone: this.customerUser.phone,
          status: "Cooking",
          location: {
            lat: this.userLocation.latitude,
            lng: this.userLocation.longitude
          }
        };
        this.order.create(order).subscribe(res => {
          console.log("Res", res);
          this.bucketService.bucketCart = [];
          var msg = "Order is created";
          this.bucketService.presentToastSuccess(msg);
          this.navCtrl.pop();
        });
      }
    } else if (!this.userLocation) {
      var msg = "Turn on your GPS to Checkout";
      this.bucketService.presentToastSuccess(msg);
    }
  }
}
