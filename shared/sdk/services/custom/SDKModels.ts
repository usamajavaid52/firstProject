/* tslint:disable */
import { Injectable } from '@angular/core';
import { Restaurants } from '../../models/Restaurants';
import { Categories } from '../../models/Categories';
import { Items } from '../../models/Items';
import { Order } from '../../models/Order';
import { Address } from '../../models/Address';
import { AppUser } from '../../models/AppUser';
import { Driver } from '../../models/Driver';
import { Favourite } from '../../models/Favourite';
import { ActivationToken } from '../../models/ActivationToken';
import { Deal } from '../../models/Deal';
import { Customer } from '../../models/Customer';
import { Ride } from '../../models/Ride';
import { Rate } from '../../models/Rate';
import { Review } from '../../models/Review';
import { Globals } from '../../models/Globals';
import { Options } from '../../models/Options';
import { Rank } from '../../models/Rank';
import { NotificationsLog } from '../../models/NotificationsLog';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Restaurants: Restaurants,
    Categories: Categories,
    Items: Items,
    Order: Order,
    Address: Address,
    AppUser: AppUser,
    Driver: Driver,
    Favourite: Favourite,
    ActivationToken: ActivationToken,
    Deal: Deal,
    Customer: Customer,
    Ride: Ride,
    Rate: Rate,
    Review: Review,
    Globals: Globals,
    Options: Options,
    Rank: Rank,
    NotificationsLog: NotificationsLog,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
