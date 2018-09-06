/* tslint:disable */

declare var Object: any;
export interface RateInterface {
  "userId": string;
  "itemId": string;
  "rate": number;
  "id"?: any;
}

export class Rate implements RateInterface {
  "userId": string;
  "itemId": string;
  "rate": number;
  "id": any;
  constructor(data?: RateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Rate`.
   */
  public static getModelName() {
    return "Rate";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Rate for dynamic purposes.
  **/
  public static factory(data: RateInterface): Rate{
    return new Rate(data);
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
      name: 'Rate',
      plural: 'Rates',
      path: 'Rates',
      idName: 'id',
      properties: {
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "itemId": {
          name: 'itemId',
          type: 'string'
        },
        "rate": {
          name: 'rate',
          type: 'number'
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
