import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ModalController,
  App,
  Platform,
  ActionSheetController
} from "ionic-angular";
import { Keyboard } from "@ionic-native/keyboard";

import {
  FavouriteApi,
  RateApi,
  ReviewApi
} from "../../../shared/sdk/services/custom/index";
import { GlobalService } from "../services/globalServices";
import { MenuItemsPage } from "../menu-items-story/menu-items";
import { AddToCartPage } from "../add-to-cart/add-to-cart";
import { CartPage } from "../cart/cart";
import { SocialSharing } from "@ionic-native/social-sharing";
import { OrderSizePage } from "../order-size/order-size";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-item-details",
  templateUrl: "item-details.html"
})
export class ItemDetailsPage {
  details: any;
  myRating: number;
  fa: number = 3;
  isFilled: boolean = true;
  reviewStatus: boolean = true;
  loader: any;
  response: any;
  reviews: any;
  radioData: any;
  resRate: any;
  resReview: any;
  userReview: any;
  allRev: any;
  name: any;
  moreR: boolean;
  lengthOfCart: Number;
  itemSize: any = "Choose Size";
  selectedRate: any;
  public customerUser: Customer = new Customer();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public fvrtApi: FavouriteApi,
    public globalservice: GlobalService,
    public rate: RateApi,
    public review: ReviewApi,
    public socialSharing: SocialSharing,
    public app: App,
    public platform: Platform,
    public actionSheet: ActionSheetController,
    public keyboard: Keyboard,
    public customer: CustomerApi
  ) {
    this.details = navParams.data.details;

    this.myRating = this.details.rate;
    this.customerUser = customer.getCachedCurrent();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ItemDetailsPage");
  }
  ngDoCheck() {
    if (this.globalservice.bucketCart) {
      this.lengthOfCart = this.globalservice.bucketCart.length;
    } else if (!this.globalservice.bucketCart) {
      this.lengthOfCart = 0;
    }
    this.isFilled;
  }
  ionViewDidEnter() {
    this.load();
    this.checkFavourite();
    this.checkRate();
    this.checkReview();
    this.allReviews();
  }
  load() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
  }

  orderSizes() {
    let modal = this.modalCtrl.create(OrderSizePage, {
      rates: this.details.rates
    });

    modal.onDidDismiss(size => {
      console.log("Dismiss", size);
      var sizeInit = this.details.rates.findIndex(
        sizeInitials => sizeInitials.sizeInitials === size
      );
      console.log("index", sizeInit);
      if (sizeInit == -1) {
        console.log("If");
      } else if (sizeInit >= 0) {
        console.log(this.details.rates[sizeInit]);
        this.selectedRate = this.details.rates[sizeInit];
      }
    });
    modal.present();
  }

  ///?????Add userID
  checkFavourite() {
    this.fvrtApi
      .find({
        where: {
          $and: [{ itemId: this.details.id }, { userId: this.customerUser.id }]
        }
      })
      .subscribe(res => {
        if (res.length > 0) {
          this.loader.dismiss();
          this.isFilled = false;
        } else if (res.length == 0) {
          this.loader.dismiss();
          this.isFilled = true;
        }
      });
  }

  addToFav(item) {
    this.isFilled = false;
    this.load();
    var fvrt = {
      userId: this.customerUser.id,
      itemId: this.details.id,
      categoryId: this.details.categoryId,
      imageUrlArray: this.details.imageUrlArray,
      title: this.details.title
    };

    this.fvrtApi.create(fvrt).subscribe(
      res => {
        this.loader.dismiss();
        console.log("Favourites", res);
        var msg = "Added to favourites!";
        this.globalservice.presentToastSuccess(msg);
      },
      err => {
        console.log("Error", err);
      }
    );
  }
  removeFromFav() {
    this.isFilled = true;
    this.load();
    this.fvrtApi
      .find({
        where: {
          $and: [{ itemId: this.details.id }, { userId: this.customerUser.id }]
        }
      })
      .subscribe(res => {
        this.loader.dismiss();
        console.log(res);
        this.response = res;
        console.log("ID", this.response[0].id);
        this.fvrtApi.deleteById(this.response[0].id).subscribe(
          res => {
            var msg = "Removed from favourites!";
            this.globalservice.presentToastSuccess(msg);
            console.log("Favourite Removed", res);
          },
          err => {
            console.log("Error", err);
          }
        );
      });
  }
  loadImages(items) {
    if (items.imageUrlArray) {
      let modal = this.modalCtrl.create(MenuItemsPage, { items: items });
      modal.onDidDismiss(() => {
        this.checkFavourite();
      });
      modal.present();
    } else {
      console.log("No Image");
    }
  }

  rateApi(num) {
    this.load();
    var _userRate = {
      itemId: this.details.id,
      userId: this.customerUser.id,
      rate: num
    };

    this.rate.create(_userRate).subscribe(res => {
      console.log("Rated", res);
      this.loader.dismiss();
    });
    setTimeout(() => {
      this.checkRate();
    }, 200);
  }

  checkRate() {
    this.rate
      .find({
        where: {
          $and: [{ itemId: this.details.id }, { userId: this.customerUser.id }]
        }
      })
      .subscribe(res => {
        this.resRate = res;

        if (res.length > 0) {
          (<HTMLInputElement>document.getElementById("star1")).disabled = true;
          (<HTMLInputElement>document.getElementById("star2")).disabled = true;
          (<HTMLInputElement>document.getElementById("star3")).disabled = true;
          (<HTMLInputElement>document.getElementById("star4")).disabled = true;
          (<HTMLInputElement>document.getElementById("star5")).disabled = true;

          if (this.resRate[0].rate >= 1 && this.resRate[0].rate < 2) {
            console.log("1a");

            (<HTMLInputElement>document.getElementById("star1")).checked = true;
          } else if (this.resRate[0].rate >= 2 && this.resRate[0].rate < 3) {
            console.log("2b");

            (<HTMLInputElement>document.getElementById("star2")).checked = true;
          } else if (this.resRate[0].rate >= 3 && this.resRate[0].rate < 4) {
            console.log("3c");

            (<HTMLInputElement>document.getElementById("star3")).checked = true;
          } else if (this.resRate[0].rate >= 4 && this.resRate[0].rate < 5) {
            console.log("4d");

            (<HTMLInputElement>document.getElementById("star4")).checked = true;
          } else if (this.resRate[0].rate == 5) {
            console.log("5e");
            (<HTMLInputElement>document.getElementById("star5")).checked = true;
          } else {
            console.log("User Has not rated the item");
          }
        }
      });
  }

  reviewApi() {
    this.load();
    if (this.customerUser.firstname) {
      this.name = this.customerUser.firstname;
    } else if (this.customerUser.firstname) {
      this.name = "anonymous";
    }
    var _userReview = {
      itemId: this.details.id,
      userId: this.customerUser.id,
      review: this.reviews,
      name: this.name
    };

    this.review.create(_userReview).subscribe(res => {
      console.log("Review", res);
      this.loader.dismiss();
    });
    setTimeout(() => {
      this.checkReview();
    }, 200);
  }
  allReviews() {
    this.review.find({ where: { itemId: this.details.id } }).subscribe(res => {
      this.allRev = res;
      if (res.length == 0) {
        this.moreR = false;
      } else if (res.length > 0) {
        this.moreR = true;
      }
    });
  }
  cart() {
    this.app.getRootNav().push(CartPage);
  }

  checkReview() {
    this.review
      .find({
        where: {
          $and: [{ itemId: this.details.id }, { userId: this.customerUser.id }]
        }
      })
      .subscribe(res => {
        if (res.length > 0) {
          this.reviewStatus = false;
          this.resReview = res;
          this.userReview = this.resReview[0].review;
        }
      });
  }

  addToCart(detail) {
    console.log(detail);
    let modal = this.modalCtrl.create(AddToCartPage, {
      Rate: this.selectedRate,
      Details: detail
    });
    modal.present();
  }
  actionsSheet() {
    let actionSheet = this.actionSheet.create({
      title: "Share on",
      buttons: [
        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          cssClass: "Whatsapp",
          handler: () => {
            console.log("Destructive clicked");
            let message =
              "Check out " + this.details.title + " on Delivery Service";
            this.socialSharing
              .shareViaWhatsApp(message, this.details.imageUrlArray[0], "")
              .then(Success => {
                console.log("Success");
              })
              .catch(err => {
                console.log("Error", err);
              });
          }
        },
        {
          text: "facebook",
          icon: "logo-facebook",
          cssClass: "facebook",
          handler: () => {
            console.log("Facebook clicked");
            let message =
              "Check out " + this.details.title + " on Delivery Service";
            this.socialSharing
              .shareViaFacebook(message, this.details.imageUrlArray[0], "")
              .then(Success => {
                console.log("Success");
              })
              .catch(err => {
                console.log("Error", err);
              });
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }
}
