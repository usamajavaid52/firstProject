/* tslint:disable */

declare var Object: any;
export interface AppUserInterface {
  "firstname": string;
  "lastname"?: string;
  "dob"?: Date;
  "email": string;
  "accountId"?: string;
  "phone": string;
  "gender"?: string;
  "address1"?: string;
  "address2"?: string;
  "country"?: string;
  "city"?: string;
  "postalcode"?: number;
  "profilepic"?: string;
  "createdate"?: Date;
  "updatedate"?: Date;
  "dev_token"?: any;
  "emailVerified"?: boolean;
  "role"?: string;
  "realm"?: string;
  "username"?: string;
  "challenges"?: any;
  "status"?: string;
  "created"?: Date;
  "lastUpdated"?: Date;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
}

export class AppUser implements AppUserInterface {
  "firstname": string;
  "lastname": string;
  "dob": Date;
  "email": string;
  "accountId": string;
  "phone": string;
  "gender": string;
  "address1": string;
  "address2": string;
  "country": string;
  "city": string;
  "postalcode": number;
  "profilepic": string;
  "createdate": Date;
  "updatedate": Date;
  "dev_token": any;
  "emailVerified": boolean;
  "role": string;
  "realm": string;
  "username": string;
  "challenges": any;
  "status": string;
  "created": Date;
  "lastUpdated": Date;
  "id": any;
  "password": string;
  accessTokens: any[];
  constructor(data?: AppUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AppUser`.
   */
  public static getModelName() {
    return "AppUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AppUser for dynamic purposes.
  **/
  public static factory(data: AppUserInterface): AppUser{
    return new AppUser(data);
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
      name: 'AppUser',
      plural: 'AppUsers',
      path: 'AppUsers',
      idName: 'id',
      properties: {
        "firstname": {
          name: 'firstname',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "dob": {
          name: 'dob',
          type: 'Date'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "accountId": {
          name: 'accountId',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'string'
        },
        "address1": {
          name: 'address1',
          type: 'string'
        },
        "address2": {
          name: 'address2',
          type: 'string'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "postalcode": {
          name: 'postalcode',
          type: 'number'
        },
        "profilepic": {
          name: 'profilepic',
          type: 'string',
          default: '/no_pic.png'
        },
        "createdate": {
          name: 'createdate',
          type: 'Date'
        },
        "updatedate": {
          name: 'updatedate',
          type: 'Date'
        },
        "dev_token": {
          name: 'dev_token',
          type: 'any',
          default: <any>null
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean',
          default: false
        },
        "role": {
          name: 'role',
          type: 'string',
          default: 'admin'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "credentials": {
          name: 'credentials',
          type: 'any'
        },
        "challenges": {
          name: 'challenges',
          type: 'any'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
