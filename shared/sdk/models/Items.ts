/* tslint:disable */

declare var Object: any;
export interface ItemsInterface {
  "categoryId": string;
  "title"?: string;
  "description": string;
  "tags"?: Array<any>;
  "imageUrlArray"?: Array<any>;
  "label"?: boolean;
  "rate"?: number;
  "rates"?: Array<any>;
  "sortPriority"?: number;
  "currency": string;
  "maxOrder"?: number;
  "minOrder"?: number;
  "extra"?: any;
  "id"?: any;
}

export class Items implements ItemsInterface {
  "categoryId": string;
  "title": string;
  "description": string;
  "tags": Array<any>;
  "imageUrlArray": Array<any>;
  "label": boolean;
  "rate": number;
  "rates": Array<any>;
  "sortPriority": number;
  "currency": string;
  "maxOrder": number;
  "minOrder": number;
  "extra": any;
  "id": any;
  constructor(data?: ItemsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Items`.
   */
  public static getModelName() {
    return "Items";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Items for dynamic purposes.
  **/
  public static factory(data: ItemsInterface): Items{
    return new Items(data);
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
      name: 'Items',
      plural: 'Items',
      path: 'Items',
      idName: 'id',
      properties: {
        "categoryId": {
          name: 'categoryId',
          type: 'string'
        },
        "title": {
          name: 'title',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "tags": {
          name: 'tags',
          type: 'Array&lt;any&gt;'
        },
        "imageUrlArray": {
          name: 'imageUrlArray',
          type: 'Array&lt;any&gt;'
        },
        "label": {
          name: 'label',
          type: 'boolean'
        },
        "rate": {
          name: 'rate',
          type: 'number'
        },
        "rates": {
          name: 'rates',
          type: 'Array&lt;any&gt;'
        },
        "sortPriority": {
          name: 'sortPriority',
          type: 'number'
        },
        "currency": {
          name: 'currency',
          type: 'string'
        },
        "maxOrder": {
          name: 'maxOrder',
          type: 'number'
        },
        "minOrder": {
          name: 'minOrder',
          type: 'number'
        },
        "extra": {
          name: 'extra',
          type: 'any'
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
