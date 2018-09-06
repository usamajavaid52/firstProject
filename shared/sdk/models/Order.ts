/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "addToCart"?: Array<any>;
  "subTotal"?: string;
  "userId"?: string;
  "restaurant"?: any;
  "date"?: Date;
  "status"?: string;
  "deliveredAt"?: Date;
  "deliveryAt"?: Date;
  "ordernumber"?: string;
  "rideId"?: string;
  "location"?: GeoPoint;
  "id"?: any;
}

export class Order implements OrderInterface {
  "addToCart": Array<any>;
  "subTotal": string;
  "userId": string;
  "restaurant": any;
  "date": Date;
  "status": string;
  "deliveredAt": Date;
  "deliveryAt": Date;
  "ordernumber": string;
  "rideId": string;
  "location": GeoPoint;
  "id": any;
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      idName: 'id',
      properties: {
        "addToCart": {
          name: 'addToCart',
          type: 'Array&lt;any&gt;'
        },
        "subTotal": {
          name: 'subTotal',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "restaurant": {
          name: 'restaurant',
          type: 'any'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "deliveredAt": {
          name: 'deliveredAt',
          type: 'Date'
        },
        "deliveryAt": {
          name: 'deliveryAt',
          type: 'Date'
        },
        "ordernumber": {
          name: 'ordernumber',
          type: 'string'
        },
        "rideId": {
          name: 'rideId',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
