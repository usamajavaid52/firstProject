/* tslint:disable */

declare var Object: any;
export interface GlobalsInterface {
  "favourites"?: number;
  "worth"?: number;
  "language"?: string;
  "userId"?: string;
  "createdAt"?: Date;
  "id"?: any;
}

export class Globals implements GlobalsInterface {
  "favourites": number;
  "worth": number;
  "language": string;
  "userId": string;
  "createdAt": Date;
  "id": any;
  constructor(data?: GlobalsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Globals`.
   */
  public static getModelName() {
    return "Globals";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Globals for dynamic purposes.
  **/
  public static factory(data: GlobalsInterface): Globals{
    return new Globals(data);
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
      name: 'Globals',
      plural: 'Globals',
      path: 'Globals',
      idName: 'id',
      properties: {
        "favourites": {
          name: 'favourites',
          type: 'number'
        },
        "worth": {
          name: 'worth',
          type: 'number'
        },
        "language": {
          name: 'language',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
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
