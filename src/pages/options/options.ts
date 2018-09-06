import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ViewController,
  LoadingController
} from "ionic-angular";
import { MenuModalPage } from "../menu-modal/menu-modal";
import { FavouriteApi } from "../../../shared/sdk/services/custom/index";
import { GlobalService } from "../services/globalServices";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

@IonicPage()
@Component({
  selector: "page-options",
  templateUrl: "options.html"
})
export class OptionsPage {
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
    public customer: CustomerApi
  ) {
    this.customerUser = customer.getCachedCurrent();
  }

  ionViewDidEnter() {
    console.log("ionViewDidLoad OptionsPage");
    this.item = this.navParams.data.item;
    // console.log(this.item);
    this.loading();
    this.checkFavourite();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  openMenu(item) {
    console.log("Open Menu", item);
    let modal = this.modalCtrl.create(MenuModalPage, { favourite: item });
    modal.present();
  }
  loading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
  }
  checkFavourite() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    this.loader.present();

    this.fvrtApi.find({ where: { itemId: this.item.id } }).subscribe(res => {
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
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.loader.present();
    var fvrt = {
      userId: this.customerUser.id,
      itemId: this.item.id,
      categoryId: this.item.categoryId,
      imageUrlArray: this.item.imageUrlArray,
      title: this.item.title
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
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.loader.present();
    this.fvrtApi
      .find({
        where: {
          $and: [{ itemId: this.item.id }, { userId: this.customerUser.id }]
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
}
