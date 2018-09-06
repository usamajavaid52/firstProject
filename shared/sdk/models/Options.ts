/* tslint:disable */

declare var Object: any;
export interface OptionsInterface {
  "orderSize"?: number;
  "deliveryFee"?: number;
  "gst"?: number;
  "id"?: any;
}

export class Options implements OptionsInterface {
  "orderSize": number;
  "deliveryFee": number;
  "gst": number;
  "id": any;
  constructor(data?: OptionsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Options`.
   */
  public static getModelName() {
    return "Options";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Options for dynamic purposes.
  **/
  public static factory(data: OptionsInterface): Options{
    return new Options(data);
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
      name: 'Options',
      plural: 'Options',
      path: 'Options',
      idName: 'id',
      properties: {
        "orderSize": {
          name: 'orderSize',
          type: 'number',
          default: 10
        },
        "deliveryFee": {
          name: 'deliveryFee',
          type: 'number'
        },
        "gst": {
          name: 'gst',
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
