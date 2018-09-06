import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCartPage } from './edit-cart';

@NgModule({
  declarations: [
    EditCartPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCartPage),
  ],
})
export class EditCartPageModule {}
