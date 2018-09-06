/* tslint:disable */

declare var Object: any;
export interface RideInterface {
  "name"?: string;
  "orders"?: Array<any>;
  "driver"?: string;
  "date"?: Date;
  "id"?: any;
}

export class Ride implements RideInterface {
  "name": string;
  "orders": Array<any>;
  "driver": string;
  "date": Date;
  "id": any;
  constructor(data?: RideInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Ride`.
   */
  public static getModelName() {
    return "Ride";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Ride for dynamic purposes.
  **/
  public static factory(data: RideInterface): Ride{
    return new Ride(data);
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
      name: 'Ride',
      plural: 'Rides',
      path: 'Rides',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "orders": {
          name: 'orders',
          type: 'Array&lt;any&gt;'
        },
        "driver": {
          name: 'driver',
          type: 'string'
        },
        "date": {
          name: 'date',
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
