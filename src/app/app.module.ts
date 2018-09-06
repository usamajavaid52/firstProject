import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { LoopBackConfig } from "../../shared/sdk";
import { SDKBrowserModule } from "../../shared/sdk/index";
import { IonicSwipeAllModule } from "ionic-swipe-all";
import { ProgressBarModule } from "ngx-progress-bar";
import { Geolocation } from "@ionic-native/geolocation";
import { SocialSharing } from "@ionic-native/social-sharing";
import { ActionSheet, ActionSheetOptions } from "@ionic-native/action-sheet";
import { OneSignal } from "@ionic-native/onesignal";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { AppRate } from "@ionic-native/app-rate";
import { CallNumber } from "@ionic-native/call-number";
import { Keyboard } from "@ionic-native/keyboard";

import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult
} from "@ionic-native/native-geocoder";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { MenuItemsPageModule } from "../pages/menu-items-story/menu-items.module";
import { ProfilePageModule } from "../pages/profile/profile.module";
import { ProfilePage } from "../pages/profile/profile";
import { DealDetailsPageModule } from "../pages/deal-details/deal-details.module";
import { MenuModalPageModule } from "../pages/menu-modal/menu-modal.module";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { SettingsPageModule } from "../pages/settings/settings.module";
import { MapPageModule } from "../pages/map/map.module";
import { PreHomePageModule } from "../pages/pre-home/pre-home.module";
import { PreSigninPageModule } from "../pages/pre-signin/pre-signin.module";
import { SigninPageModule } from "../pages/signin/signin.module";
import { ItemDetailsPageModule } from "../pages/item-details/item-details.module";
import { OptionsPageModule } from "../pages/options/options.module";
import { SignupPageModule } from "../pages/signup/signup.module";
import { VerificationPageModule } from "../pages/verification/verification.module";
import { CheckFavouritePageModule } from "../pages/check-favourite/check-favourite.module";
import { UserInfoPageModule } from "../pages/user-info/user-info.module";
import { AboutUsPageModule } from "../pages/about-us/about-us.module";
import { LanguagePageModule } from "../pages/language/language.module";
import { AddToCartPageModule } from "../pages/add-to-cart/add-to-cart.module";
import { GlobalService } from "../pages/services/globalServices";
import { CartPageModule } from "../pages/cart/cart.module";
import { EditCartPageModule } from "../pages/edit-cart/edit-cart.module";
import { OrderSizePageModule } from "../pages/order-size/order-size.module";
import { NotificationsPageModule } from "../pages/notifications/notifications.module";
import { FiltersPageModule } from "../pages/filters/filters.module";

import { PipesModule } from "../pipes/pipes.module";
import { Push } from "@ionic-native/push";
import { Device } from "@ionic-native/device";

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    MenuItemsPageModule,
    ProfilePageModule,
    DealDetailsPageModule,
    MenuModalPageModule,
    TabsPageModule,
    SettingsPageModule,
    MapPageModule,
    PreHomePageModule,
    PreSigninPageModule,
    SigninPageModule,
    ItemDetailsPageModule,
    OptionsPageModule,
    SignupPageModule,
    VerificationPageModule,
    CheckFavouritePageModule,
    UserInfoPageModule,
    AboutUsPageModule,
    LanguagePageModule,
    AddToCartPageModule,
    EditCartPageModule,
    CartPageModule,
    OrderSizePageModule,
    NotificationsPageModule,
    FiltersPageModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    SDKBrowserModule.forRoot(),
    IonicSwipeAllModule,
    ProgressBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ProfilePage],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    SocialSharing,
    ActionSheet,
    Keyboard,
    OneSignal,
    ScreenOrientation,
    LocalNotifications,
    GlobalService,
    AppRate,
    CallNumber,
    NativeGeocoder,
    Push,
    Device,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
