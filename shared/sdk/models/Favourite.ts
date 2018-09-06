/* tslint:disable */

declare var Object: any;
export interface FavouriteInterface {
  "userId"?: string;
  "itemId"?: string;
  "categoryId"?: string;
  "imageUrlArray "?: any;
  "title"?: string;
  "tags"?: Array<any>;
  "id"?: any;
}

export class Favourite implements FavouriteInterface {
  "userId": string;
  "itemId": string;
  "categoryId": string;
  "imageUrlArray ": any;
  "title": string;
  "tags": Array<any>;
  "id": any;
  constructor(data?: FavouriteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Favourite`.
   */
  public static getModelName() {
    return "Favourite";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Favourite for dynamic purposes.
  **/
  public static factory(data: FavouriteInterface): Favourite{
    return new Favourite(data);
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
      name: 'Favourite',
      plural: 'Favourites',
      path: 'Favourites',
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
        "categoryId": {
          name: 'categoryId',
          type: 'string'
        },
        "imageUrlArray ": {
          name: 'imageUrlArray ',
          type: 'any'
        },
        "title": {
          name: 'title',
          type: 'string'
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
