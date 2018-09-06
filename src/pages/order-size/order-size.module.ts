import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSizePage } from './order-size';

@NgModule({
  declarations: [
    OrderSizePage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSizePage),
  ],
})
export class OrderSizePageModule {}
