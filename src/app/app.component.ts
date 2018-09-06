import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { OneSignal } from "@ionic-native/onesignal";
import * as mqtt from "mqtt";
import { LocalNotifications } from "@ionic-native/local-notifications";

import { LoopBackConfig } from "../../shared/sdk";
import { BASE_URL, API_VERSION } from "../../shared/baseurl";
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { PreHomePage } from "../pages/pre-home/pre-home";
import { MapPage } from "../pages/map/map";
import { Customer } from "../../shared/sdk/models";
import { CustomerApi } from "../../shared/sdk/services/custom/index";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = HomePage;
  // PreHomePage
  orientation: string = "landscape";
  client: any;
  public customerUser: Customer = new Customer();
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private localNotifications: LocalNotifications,
    public oneSignal: OneSignal,
    public customer: CustomerApi
  ) {
    this.customerUser = customer.getCachedCurrent();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("Inside platform . then");

      this.client = mqtt.connect("ws://144.217.164.222:8083", {
        clean: true,
        username: "p@kistan",
        password: "p@kistan"
      });
      this.initialize();
      statusBar.styleDefault();
      splashScreen.hide();

      // this.oneSignal.startInit(
      //   "b2f7f966-d8cc-11e4-bed1-df8f05be55ba",
      //   "703322744261"
      // );

      // this.oneSignal.inFocusDisplaying(
      //   this.oneSignal.OSInFocusDisplayOption.InAppAlert
      // );

      // this.oneSignal.handleNotificationReceived().subscribe(() => {
      //   // do something when notification is received
      // });

      // this.oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // this.oneSignal.endInit();
      var notificationOpenedCallback = function(jsonData) {
        console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
      };
      window["plugins"].OneSignal.startInit(
        "b7815af3-cd8b-426c-9f17-9fe538cb6cc8",
        "755424533051"
      )
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();

      this.screenOrientation.lock("portrait");

      // console.log(this.screenOrientation.type);
    });
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
  initialize() {
    var customerId = this.customerUser.id;
    if (customerId) {
      // console.log("Subscribing to driver ID ", customerId);
      this.client.subscribe(customerId);
      this.client.on("message", function(topic, payload) {
        // console.log("This is topic ", topic);
        var data = JSON.parse(payload);
        if (topic == customerId) {
          // this.localNotifications.getAllScheduled().then(data => {
          //   this.notifications = data;
          //   let notification = {
          //     id: customerId,
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

          console.log(
            "This is datasssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            data
          );

          // nav.push(newridePage,{order:data});
        }
      });
    }
  }
  lock() {
    this.screenOrientation.lock("portrait");
  }
}
