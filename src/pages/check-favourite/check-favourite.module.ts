import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckFavouritePage } from './check-favourite';

@NgModule({
  declarations: [
    CheckFavouritePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckFavouritePage),
  ],
})
export class CheckFavouritePageModule {}
