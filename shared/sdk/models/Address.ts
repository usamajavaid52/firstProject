/* tslint:disable */
import {
  GeoPoint
} from '../index';

declare var Object: any;
export interface AddressInterface {
  "name"?: string;
  "city"?: string;
  "pincode"?: string;
  "area"?: string;
  "mobile"?: string;
  "address"?: string;
  "userId"?: string;
  "location"?: GeoPoint;
  "tags"?: Array<any>;
  "id"?: any;
}

export class Address implements AddressInterface {
  "name": string;
  "city": string;
  "pincode": string;
  "area": string;
  "mobile": string;
  "address": string;
  "userId": string;
  "location": GeoPoint;
  "tags": Array<any>;
  "id": any;
  constructor(data?: AddressInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Address`.
   */
  public static getModelName() {
    return "Address";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Address for dynamic purposes.
  **/
  public static factory(data: AddressInterface): Address{
    return new Address(data);
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
      name: 'Address',
      plural: 'Addresses',
      path: 'Addresses',
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
        "pincode": {
          name: 'pincode',
          type: 'string'
        },
        "area": {
          name: 'area',
          type: 'string'
        },
        "mobile": {
          name: 'mobile',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "tags": {
          name: 'tags',
          type: 'Array&lt;any&gt;'
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
