import { Component, ViewChild, NgZone } from "@angular/core";
import {
  NavController,
  LoadingController,
  Slides,
  App,
  ModalController
} from "ionic-angular";

import { MenuItemsPage } from "../menu-items-story/menu-items";
import { ProfilePage } from "../profile/profile";
import { DealDetailsPage } from "../deal-details/deal-details";
import { MapPage } from "../map/map";
import { ItemDetailsPage } from "../item-details/item-details";

import { SettingsPage } from "../settings/settings";
import { CheckFavouritePage } from "../check-favourite/check-favourite";
import { GlobalService } from "../services/globalServices";
import { LocalNotifications } from "@ionic-native/local-notifications";

import {
  CategoriesApi,
  ItemsApi,
  FavouriteApi,
  OrderApi,
  DealApi
} from "../../../shared/sdk/services/index";
import { CartPage } from "../cart/cart";
import { Customer } from "../../../shared/sdk/models";
import { CustomerApi } from "../../../shared/sdk/services/custom/index";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  topBar: string = "menu";
  categories: any;
  finalCategory = [];
  i = 0;
  j = 0;
  filteredCategory: any;
  favourites: any;
  items: any;
  favouriteItems: any;
  orders: any;
  deals: any;
  isFilled: boolean = false;
  id = [];
  user: boolean;
  fvrtres: any;
  response: any;
  loader: any;
  Favourite: Boolean;
  Deal: Boolean;
  Food: Boolean;
  favouriteDetails: any;
  lengthOfCart: Number;
  notifications: any;
  // descending: boolean = false;
  // order: number;
  // column: string = "name";
  public customerUser: Customer = new Customer();

  constructor(
    public navCtrl: NavController,
    public itemsApi: ItemsApi,
    public categoryApi: CategoriesApi,
    public fvrtApi: FavouriteApi,
    public ordrApi: OrderApi,
    public dealApi: DealApi,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public zone: NgZone,
    public globalService: GlobalService,
    public app: App,
    public customer: CustomerApi,
    public localNotifications: LocalNotifications
  ) {
    this.customerUser = customer.getCachedCurrent();

    // this.descending = !this.descending;
    // this.order = this.descending ? -1 : 1;
  }

  ionViewDidLoad() {
    // this.slides.autoplayDisableOnInteraction = false;
    // this.localNotifications.getAllScheduled().then(data => {
    //   this.notifications = data;
    //   let notification = {
    //     id: this.customerUser.id,
    //     title: "Reminder Notification",
    //     text: "Notification Head",
    //     at: new Date(new Date().getTime() + 60 * 1000),
    //     data: {
    //       data: "Your order is on the way now"
    //     }
    //   };
    //   this.notifications.push(notification);
    //   this.localNotifications.clearAll().then(clearData => {
    //     this.localNotifications.schedule(this.notifications);
    //   });
    // });
  }

  ionViewWillLoad() {
    if (this.customerUser && this.customerUser.smsVerified) {
      this.user = true;
    } else {
      this.user = false;
    }
  }
  ionViewDidEnter() {
    console.log("willEDidEnternter");

    this.FoodApi();
    this.favouriteApi();
    this.orderApi();
    this.dealsApi();
    this.checkFvrt();
  }
  // goToSlide() {
  //   console.log("Slides");
  //   this.slides.slideNext(2, true);
  // }
  ionViewWillEnter() {
    this.loaderCtrl();
    this.FoodApi();
    this.orderApi();
    this.dealsApi();
    this.favouriteApi();
    // this.allFunctions();
  }
  ngDoCheck() {
    if (this.globalService.bucketCart) {
      this.lengthOfCart = this.globalService.bucketCart.length;
    } else if (!this.globalService.bucketCart) {
      this.lengthOfCart = 0;
    }
  }

  allFunctions() {
    this.checkFvrt();
    this.favouriteApi();
    // this.orderApi();
    this.dealsApi();
  }

  cart() {
    this.app.getRootNav().push(CartPage);
  }

  loaderCtrl() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
      // dismissOnPageChange: true
    });
    this.loader.present();
  }

  loaderDismiss() {
    console.log("Loader Dismiss", this.Favourite, this.Deal, this.Food);
    if (this.Favourite && this.Deal && this.Food) {
      this.loader.dismiss();
      this.Deal = false;
      this.Favourite = false;
      this.Food = false;
    }
  }

  FoodApi() {
    this.filteredCategory = [];
    this.items = [];
    this.finalCategory = [];
    this.categories = [];
    this.items = [];
    this.categoryApi.find().subscribe(res => {
      this.categories = res;
    });
    this.itemsApi.find().subscribe(res => {
      this.items = res;

      this.i = 0;
      for (let entry of this.categories) {
        this.items.forEach((item, index) => {
          // this.items[index].fav = false;

          if (entry.id == item.categoryId) {
            this.finalCategory[this.i] = entry;

            this.i++;
            var newArray = Array.from(new Set(this.finalCategory));
            this.filteredCategory = newArray;
          }
        });
      }

      this.checkFvrt();
    });
  }

  checkFvrt() {
    // this.favouriteApi();
    var index = 0;
    for (let items in this.items) {
      this.fvrtApi
        .find({
          where: {
            $and: [
              { itemId: this.items[items].id },
              { userId: this.customerUser.id }
            ]
          }
        })
        .subscribe(res => {
          this.fvrtres = res;

          if (res.length > 0) {
            this.items[items].fav = true;
            index++;
          } else if (res.length == 0) {
            this.items[items].fav = false;
            index++;
          }
          if (index == this.items.length) {
            this.Food = true;
            this.loaderDismiss();
          }
        });
    }
  }

  favouriteApi() {
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   dismissOnPageChange: true
    // });
    // loader.present();
    this.fvrtApi
      .find({
        where: { userId: this.customerUser.id }
      })
      .subscribe(res => {
        if (res.length > 0) {
          this.user = true;
        } else if (res.length == 0) {
          this.user = false;
        }
        this.favourites = res;

        this.Favourite = true;
        this.loaderDismiss();
      });
  }

  orderApi() {
    // let load = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   dismissOnPageChange: true
    // });
    // load.present();
    this.ordrApi
      .find({
        where: { userId: this.customerUser.id }
      })
      .subscribe(res => {
        this.orders = res;
        // load.dismiss();
      });
  }
  dealsApi() {
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   dismissOnPageChange: true
    // });
    // loader.present();
    this.dealApi.find().subscribe(res => {
      this.deals = res;
      this.Deal = true;
      this.loaderDismiss();
    });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }
  goToSettings() {
    let modal = this.modalCtrl.create(SettingsPage);
    modal.present();
  }
  openMenuModal(fav) {
    let modal = this.modalCtrl.create(CheckFavouritePage, { favourite: fav });
    modal.onDidDismiss(() => {
      let load = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 4000
        // dismissOnPageChange: true
      });
      load.present();
      this.allFunctions();
    });
    modal.present();
  }
  goToItems(items) {
    if (items.imageUrlArray) {
      let modal = this.modalCtrl.create(MenuItemsPage, { items: items });
      modal.onDidDismiss(() => {
        this.loader.present();
        this.allFunctions();
        this.loader.dismiss();
      });
      modal.present();
    } else {
      console.log("No Image");
    }
  }
  goToDeals(deal) {
    console.log("DEAL", deal);
    let modal = this.modalCtrl.create(DealDetailsPage, { deal: deal });
    modal.present();
  }
  openMap(order) {
    let modal = this.modalCtrl.create(MapPage, { order: order });
    modal.present();
  }
  details(details) {
    this.app.getRootNav().push(ItemDetailsPage, { details: details });
  }
  fvrtDetails(id) {
    console.log("fvrtDetails", id);
    this.itemsApi.find({ where: { id: id } }).subscribe(res => {
      console.log("fvrtDetails res", res);
      this.favouriteDetails = res;
      this.navCtrl.push(ItemDetailsPage, { details: this.favouriteDetails[0] });
    });
  }

  add(item) {
    console.log("Item added", item);
    this.loaderCtrl();
    var fvrt = {
      userId: this.customerUser.id,
      itemId: item.id,
      categoryId: item.categoryId,
      imageUrlArray: item.imageUrlArray,
      title: item.title
    };
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   dismissOnPageChange: true
    // });
    // loader.present();
    this.fvrtApi.create(fvrt).subscribe(
      res => {
        console.log("Favourites", res);
        var msg = "Added to favourites!";
        this.globalService.presentToastSuccess(msg);
        // this.FoodApi();
        // this.favouriteApi();
        // loader.dismiss();
        this.allFunctions();
      },
      err => {
        console.log("Error", err);
      }
    );
  }
  remove(item) {
    this.loaderCtrl();
    this.fvrtApi
      .find({
        where: {
          $and: [{ itemId: item.id }, { userId: this.customerUser.id }]
        }
      })
      .subscribe(res => {
        this.response = res;

        this.fvrtApi.deleteById(this.response[0].id).subscribe(
          res => {
            var msg = "Removed from favourites!";
            this.globalService.presentToastSuccess(msg);
            console.log("Favourite Removed", res);
            // this.FoodApi();
            // this.favouriteApi();
            // loader.dismiss();
            this.allFunctions();
          },
          err => {
            console.log("Error", err);
          }
        );
      });
  }

  scrollHandler(event) {
    this.zone.run(() => {
      if (event.deltaY < 0) {
        event.deltaY = 0;
      }
    });
  }
}
