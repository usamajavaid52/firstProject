import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ActionSheetController
} from "ionic-angular";
import { SocialSharing } from "@ionic-native/social-sharing";
// import { ActionSheet, ActionSheetOptions } from "@ionic-native/action-sheet";

/**
 * Generated class for the MenuModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-menu-modal",
  templateUrl: "menu-modal.html"
})
export class MenuModalPage {
  favouriteItems: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public socialSharing: SocialSharing,
    public actionSheet: ActionSheetController
  ) {
    this.favouriteItems = navParams.data.favourite;
    console.log("Share", this.favouriteItems);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MenuModalPage");
  }
  closeModal() {
    this.viewCtrl.dismiss();
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
              "Check out " + this.favouriteItems.title + " on Delivery Service";
            this.socialSharing
              .shareViaWhatsApp(
                message,
                this.favouriteItems.imageUrlArray[0],
                ""
              )
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
              "Check out " + this.favouriteItems.title + " on Delivery Service";
            this.socialSharing
              .shareViaFacebook(
                message,
                this.favouriteItems.imageUrlArray[0],
                ""
              )
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
