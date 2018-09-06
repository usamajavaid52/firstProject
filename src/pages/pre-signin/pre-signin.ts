import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SigninPage } from "../signin/signin";
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { Device } from "@ionic-native/device";

/**
 * Generated class for the PreSigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pre-signin",
  templateUrl: "pre-signin.html"
})
export class PreSigninPage {
  private options: PushOptions;
  private pushObject: PushObject;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private push: Push
  ) {
    platform.ready().then(() => {
      // to check if we have permission
      this.push.hasPermission().then((res: any) => {
        if (res.isEnabled) {
          console.log("We have permission to send push notifications");
        } else {
          console.log("We do not have permission to send push notifications");
        }
      });
      this.options = {
        android: {
          sound: true,
          vibrate: true,
          forceShow: true
        },
        ios: {
          alert: "true",
          badge: true,
          sound: "false"
        },
        windows: {}
      };
      this.pushObject = this.push.init(this.options);
      /*
      console.log('Device UUID is: ' + this.device.uuid);
      */
      // this.user.deviceId = this.device.uuid;
      this.pushObject
        .on("notification")
        .subscribe((notification: any) =>
          console.log("Received a notification", notification)
        );
      this.pushObject.on("registration").subscribe((registration: any) => {
        console.log("Device registered", registration);
        // this.user.pushToken = registration.registrationId;
      });
      this.pushObject
        .on("error")
        .subscribe(error => console.error("Error with Push plugin", error));
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PreSigninPage");
  }

  signin() {
    this.navCtrl.push(SigninPage);
  }
}
