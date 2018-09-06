import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreHomePage } from './pre-home';

@NgModule({
  declarations: [
    PreHomePage,
  ],
  imports: [
    IonicPageModule.forChild(PreHomePage),
  ],
})
export class PreHomePageModule {}
