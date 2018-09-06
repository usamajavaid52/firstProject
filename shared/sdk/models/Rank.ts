/* tslint:disable */

declare var Object: any;
export interface RankInterface {
  "title": string;
  "id"?: any;
}

export class Rank implements RankInterface {
  "title": string;
  "id": any;
  constructor(data?: RankInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Rank`.
   */
  public static getModelName() {
    return "Rank";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Rank for dynamic purposes.
  **/
  public static factory(data: RankInterface): Rank{
    return new Rank(data);
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
      name: 'Rank',
      plural: 'Rank',
      path: 'Rank',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
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
