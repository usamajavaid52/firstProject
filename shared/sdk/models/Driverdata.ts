/* tslint:disable */

declare var Object: any;
export interface DriverdataInterface {
  "latitude"?: string;
  "longitude"?: string;
  "email"?: string;
  "id"?: number;
}

export class Driverdata implements DriverdataInterface {
  "latitude": string;
  "longitude": string;
  "email": string;
  "id": number;
  constructor(data?: DriverdataInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Driverdata`.
   */
  public static getModelName() {
    return "Driverdata";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Driverdata for dynamic purposes.
  **/
  public static factory(data: DriverdataInterface): Driverdata{
    return new Driverdata(data);
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
      name: 'Driverdata',
      plural: 'Driverdata',
      path: 'Driverdata',
      idName: 'id',
      properties: {
        "latitude": {
          name: 'latitude',
          type: 'string'
        },
        "longitude": {
          name: 'longitude',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
