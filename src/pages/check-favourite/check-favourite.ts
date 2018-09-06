import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController,
  LoadingController,
  ActionSheetController
} from "ionic-angular";
import { MenuModalPage } from "../menu-modal/menu-modal";
import { FavouriteApi } from "../../../shared/sdk/services/custom/index";
import { GlobalService } from "../services/globalServices";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

import { SocialSharing } from "@ionic-native/social-sharing";
/**
 * Generated class for the CheckFavouritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-check-favourite",
  templateUrl: "check-favourite.html"
})
export class CheckFavouritePage {
  item: any;
  isFilled: boolean = true;
  response: any;
  loader: any;
  public customerUser: Customer = new Customer();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public fvrtApi: FavouriteApi,
    public globalservice: GlobalService,
    public loadingCtrl: LoadingController,
    public customer: CustomerApi,
    public socialSharing: SocialSharing,
    public actionSheet: ActionSheetController
  ) {
    this.customerUser = customer.getCachedCurrent();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OptionsPage");
    this.item = this.navParams.data.favourite;
    console.log(this.item);
    this.loaderCtrl();
    this.checkFavourite();
  }

  loaderCtrl() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
      // dismissOnPageChange: true
    });
    this.loader.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  openMenu(item) {
    console.log("Open Menu", item);
    let modal = this.modalCtrl.create(MenuModalPage, { favourite: item });
    modal.present();
  }
  checkFavourite() {
    this.fvrtApi
      .find({ where: { itemId: this.item.itemId } })
      .subscribe(res => {
        if (res.length > 0) {
          this.isFilled = false;
          this.loader.dismiss();
        } else if (res.length == 0) {
          this.isFilled = true;
          this.loader.dismiss();
        }
      });
  }
  addToFav(item) {
    this.loaderCtrl();
    this.isFilled = false;
    var fvrt = {
      userId: this.customerUser.id,
      itemId: this.item.itemId,
      categoryId: this.item.categoryId,
      imageUrlArray: this.item.imageUrlArray,
      title: this.item.title
    };

    this.fvrtApi.create(fvrt).subscribe(
      res => {
        console.log("Favourites", res);
        var msg = "Added to favourites!";
        this.loader.dismiss();
        this.globalservice.presentToastSuccess(msg);
      },
      err => {
        console.log("Error", err);
      }
    );
  }
  removeFromFav() {
    this.loaderCtrl();
    this.isFilled = true;
    this.fvrtApi
      .find({
        where: {
          $and: [{ itemId: this.item.itemId }, { userId: this.customerUser.id }]
        }
      })
      .subscribe(res => {
        console.log(res);
        this.response = res;
        console.log("ID", this.response[0].id);
        this.fvrtApi.deleteById(this.response[0].id).subscribe(
          res => {
            this.loader.dismiss();
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
  actionsSheet(item) {
    let actionSheet = this.actionSheet.create({
      title: "Share on",
      buttons: [
        {
          text: "Whatsapp",
          icon: "logo-whatsapp",
          cssClass: "Whatsapp",
          handler: () => {
            console.log("Destructive clicked");
            let message = "Check out " + item.title + " on Delivery Service";
            this.socialSharing
              .shareViaWhatsApp(message, item.imageUrlArray[0], "")
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
            let message = "Check out " + item.title + " on Delivery Service";
            this.socialSharing
              .shareViaFacebook(message, item.imageUrlArray[0], "")
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
