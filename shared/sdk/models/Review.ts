/* tslint:disable */

declare var Object: any;
export interface ReviewInterface {
  "itemId": string;
  "userId": string;
  "review": string;
  "id"?: any;
}

export class Review implements ReviewInterface {
  "itemId": string;
  "userId": string;
  "review": string;
  "id": any;
  constructor(data?: ReviewInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Review`.
   */
  public static getModelName() {
    return "Review";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Review for dynamic purposes.
  **/
  public static factory(data: ReviewInterface): Review{
    return new Review(data);
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
      name: 'Review',
      plural: 'Reviews',
      path: 'Reviews',
      idName: 'id',
      properties: {
        "itemId": {
          name: 'itemId',
          type: 'string'
        },
        "userId": {
          name: 'userId',
          type: 'string'
        },
        "review": {
          name: 'review',
          type: 'string'
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
