/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface RestaurantsInterface {
  "name": string;
  "city": string;
  "branch": string;
  "address": string;
  "phone"?: string;
  "tags"?: Array<any>;
  "phoneList"?: Array<any>;
  "postalCode"?: number;
  "sortPriority"?: number;
  "imageUrlArray"?: Array<any>;
  "location"?: GeoPoint;
  "id"?: any;
}

export class Restaurants implements RestaurantsInterface {
  "name": string;
  "city": string;
  "branch": string;
  "address": string;
  "phone": string;
  "tags": Array<any>;
  "phoneList": Array<any>;
  "postalCode": number;
  "sortPriority": number;
  "imageUrlArray": Array<any>;
  "location": GeoPoint;
  "id": any;
  constructor(data?: RestaurantsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Restaurants`.
   */
  public static getModelName() {
    return "Restaurants";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Restaurants for dynamic purposes.
  **/
  public static factory(data: RestaurantsInterface): Restaurants{
    return new Restaurants(data);
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
      name: 'Restaurants',
      plural: 'Restaurants',
      path: 'Restaurants',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "branch": {
          name: 'branch',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "tags": {
          name: 'tags',
          type: 'Array&lt;any&gt;'
        },
        "phoneList": {
          name: 'phoneList',
          type: 'Array&lt;any&gt;'
        },
        "postalCode": {
          name: 'postalCode',
          type: 'number'
        },
        "sortPriority": {
          name: 'sortPriority',
          type: 'number'
        },
        "imageUrlArray": {
          name: 'imageUrlArray',
          type: 'Array&lt;any&gt;'
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
