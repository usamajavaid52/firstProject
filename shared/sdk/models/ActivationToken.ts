/* tslint:disable */

declare var Object: any;
export interface ActivationTokenInterface {
  "token"?: string;
  "code"?: string;
  "username"?: string;
  "id"?: any;
}

export class ActivationToken implements ActivationTokenInterface {
  "token": string;
  "code": string;
  "username": string;
  "id": any;
  constructor(data?: ActivationTokenInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ActivationToken`.
   */
  public static getModelName() {
    return "ActivationToken";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ActivationToken for dynamic purposes.
  **/
  public static factory(data: ActivationTokenInterface): ActivationToken{
    return new ActivationToken(data);
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
      name: 'ActivationToken',
      plural: 'ActivationTokens',
      path: 'ActivationTokens',
      idName: 'id',
      properties: {
        "token": {
          name: 'token',
          type: 'string'
        },
        "code": {
          name: 'code',
          type: 'string'
        },
        "username": {
          name: 'username',
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
