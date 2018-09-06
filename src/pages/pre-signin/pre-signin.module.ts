import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreSigninPage } from './pre-signin';

@NgModule({
  declarations: [
    PreSigninPage,
  ],
  imports: [
    IonicPageModule.forChild(PreSigninPage),
  ],
})
export class PreSigninPageModule {}
