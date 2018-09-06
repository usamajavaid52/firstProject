import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuItemsPage } from './menu-items';

@NgModule({
  declarations: [
    MenuItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuItemsPage),
  ],
})
export class MenuItemsPageModule {}
