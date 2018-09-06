/* tslint:disable */

declare var Object: any;
export interface DealInterface {
  "title"?: string;
  "imageUrlArray"?: Array<any>;
  "description"?: string;
  "tags"?: Array<any>;
  "items"?: Array<any>;
  "id"?: any;
}

export class Deal implements DealInterface {
  "title": string;
  "imageUrlArray": Array<any>;
  "description": string;
  "tags": Array<any>;
  "items": Array<any>;
  "id": any;
  constructor(data?: DealInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Deal`.
   */
  public static getModelName() {
    return "Deal";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Deal for dynamic purposes.
  **/
  public static factory(data: DealInterface): Deal{
    return new Deal(data);
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
      name: 'Deal',
      plural: 'Deals',
      path: 'Deals',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "imageUrlArray": {
          name: 'imageUrlArray',
          type: 'Array&lt;any&gt;'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "tags": {
          name: 'tags',
          type: 'Array&lt;any&gt;'
        },
        "items": {
          name: 'items',
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
