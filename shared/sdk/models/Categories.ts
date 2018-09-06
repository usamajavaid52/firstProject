/* tslint:disable */

declare var Object: any;
export interface CategoriesInterface {
  "restaurantId": string;
  "title": string;
  "description"?: string;
  "imageUrlArray"?: Array<any>;
  "sortPriority"?: number;
  "tags"?: Array<any>;
  "id"?: any;
}

export class Categories implements CategoriesInterface {
  "restaurantId": string;
  "title": string;
  "description": string;
  "imageUrlArray": Array<any>;
  "sortPriority": number;
  "tags": Array<any>;
  "id": any;
  constructor(data?: CategoriesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Categories`.
   */
  public static getModelName() {
    return "Categories";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Categories for dynamic purposes.
  **/
  public static factory(data: CategoriesInterface): Categories{
    return new Categories(data);
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
      name: 'Categories',
      plural: 'Categories',
      path: 'Categories',
      idName: 'id',
      properties: {
        "restaurantId": {
          name: 'restaurantId',
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
        "imageUrlArray": {
          name: 'imageUrlArray',
          type: 'Array&lt;any&gt;'
        },
        "sortPriority": {
          name: 'sortPriority',
          type: 'number'
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
