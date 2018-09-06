import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  Slides,
  ModalController,
  Platform,
  LoadingController,
  ActionSheetController,
  Gesture
} from "ionic-angular";
import { IonicSwipeAllModule } from "ionic-swipe-all";
import { StatusBar } from "@ionic-native/status-bar";
import { ProgressBarModule } from "ngx-progress-bar";
import { MenuModalPage } from "../menu-modal/menu-modal";
import { OptionsPage } from "../options/options";
import { FavouriteApi } from "../../../shared/sdk/services/custom/index";
import { GlobalService } from "../services/globalServices";
import { ItemDetailsPage } from "../item-details/item-details";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

import { SocialSharing } from "@ionic-native/social-sharing";
@IonicPage()
@Component({
  selector: "page-menu-items",
  templateUrl: "menu-items.html"
})
export class MenuItemsPage {
  @ViewChild(Slides) slides: Slides;
  activeSlideIndex: number = 0;
  items: any;
  itemsImage: any;
  progress: number = 0;
  public n: number = 1;
  height: any;
  isFilled: boolean = true;
  response: any;
  loader: any;
  width: number;
  public customerUser: Customer = new Customer();

  // slideData = [
  //   { id: 1, image: "assets/venue_menu_snap/venue_menu_snap-0.png" },
  //   { id: 2, image: "assets/venue_menu_snap/venue_menu_snap-1.jpg" },
  //   { id: 3, image: "assets/venue_menu_snap/venue_menu_snap-2.jpg" },
  //   { id: 4, image: "assets/venue_menu_snap/venue_menu_snap-8.jpg" },
  //   { id: 5, image: "assets/venue_menu_snap/venue_menu_snap-3.jpg" },
  //   { id: 6, image: "assets/venue_menu_snap/venue_menu_snap-4.jpg" },
  //   { id: 7, image: "assets/venue_menu_snap/venue_menu_snap-5.jpg" },
  //   { id: 8, image: "assets/venue_menu_snap/venue_menu_snap-2.jpg" }
  //   // { id: 9, image: "assets/venue_menu_snap/venue_menu_snap-7.jpg" },
  //   // { id: 10, image: "assets/venue_menu_snap/venue_menu_snap-8.jpg" }
  // ];

  constructor(
    public statusBar: StatusBar,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public modal: ModalController,
    public navParams: NavParams,
    public platform: Platform,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public fvrtApi: FavouriteApi,
    public globalservice: GlobalService,
    public customer: CustomerApi,
    public socialSharing: SocialSharing,
    public actionSheet: ActionSheetController
  ) {
    this.customerUser = customer.getCachedCurrent();
    this.items = navParams.data.items;
    this.itemsImage = navParams.data.items.imageUrlArray;
    platform.ready().then(readySource => {
      // console.log("Width: " + platform.width());
      // console.log("Height: " + platform.height());
      this.height = platform.height();
      // this.slides.autoplayDisableOnInteraction = false;
    });
  }

  // ionViewDidEnter() {
  //   this.statusBar.hide();

  //   this.slides.autoplay = true;
  //   this.slides.startAutoplay();

  // }
  ionViewWillLeave() {
    this.statusBar.show();
  }

  // openMenu(item) {
  //   console.log("Open Menu", item);
  //   let modal = this.modalCtrl.create(MenuModalPage, { favourite: item });
  //   modal.present();
  // }
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
    this.fvrtApi.find({ where: { itemId: this.items.id } }).subscribe(res => {
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
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
    var fvrt = {
      userId: this.customerUser.id,
      itemId: this.items.id,
      categoryId: this.items.categoryId,
      imageUrlArray: this.items.imageUrlArray,
      title: this.items.title
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
      content: "Please wait...",
      dismissOnPageChange: true
    });

    this.loader.present();
    this.fvrtApi
      .find({
        where: {
          $and: [{ itemId: this.items.id }, { userId: this.customerUser.id }]
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

  public ionViewDidEnter() {
    if (this.itemsImage) {
      this.width = 100 / this.itemsImage.length - 2;
      const drawBars = document.getElementsByClassName(
        "progress-outer"
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < drawBars.length; i++) {
        drawBars[i].style.width = this.width + "%";
      }
    }

    const valrectext = document.getElementById("recText");
    if (valrectext) {
      valrectext.style.visibility = "visible";
    }
    const valprogress = document.getElementById("progress");
    if (valprogress) {
      valprogress.style.visibility = "visible";
    }

    this.statusBar.hide();
    this.slides.autoplayDisableOnInteraction = false;
    this.slides.startAutoplay();
    this.checkFavourite();
    this.hi();
  }

  public onSlideChange(i) {
    const currentIndex = this.slides.getActiveIndex();
    this.activeSlideIndex = currentIndex;
    this.hi();
  }
  public hi() {
    setTimeout(() => {
      this.progress = this.progress + 1;
      if (this.progress < 100) {
        var closedView: boolean = false;
        const value = document.getElementById("slide" + this.activeSlideIndex);
        if (value) {
          value.style.width = this.progress + "%";
        }
        if (this.slides.isEnd() && closedView == false) {
          setTimeout(() => {
            // this.dismiss();
            closedView = true;
          }, 3000);
        }
        this.hi();
      } else {
        this.progress = 0;
        // this.viewCtrl.dismiss();
      }
    }, 20);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  goToSlide() {
    this.slides.slideTo(this.activeSlideIndex + 1, 500);
  }

  swipe(event) {
    console.log("How many times", event);
    if (
      event.additionalEvent == "panup" ||
      event.additionalEvent == "pandown"
    ) {
      console.log("if");
      this.viewCtrl.dismiss();
    }
  }

  // openMenuModal(item) {
  //   console.log(item);
  //   let modal = this.modalCtrl.create(OptionsPage, { item: item });
  //   modal.present();
  //   this.slides.autoplay = false;
  // }
  openItems(i) {
    this.navCtrl.push(ItemDetailsPage, { details: i });
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
