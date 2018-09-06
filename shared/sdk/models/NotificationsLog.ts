/* tslint:disable */

declare var Object: any;
export interface NotificationsLogInterface {
  "title": string;
  "text": string;
  "type": string;
  "createdDateTime": Date;
  "id"?: any;
}

export class NotificationsLog implements NotificationsLogInterface {
  "title": string;
  "text": string;
  "type": string;
  "createdDateTime": Date;
  "id": any;
  constructor(data?: NotificationsLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `NotificationsLog`.
   */
  public static getModelName() {
    return "NotificationsLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of NotificationsLog for dynamic purposes.
  **/
  public static factory(data: NotificationsLogInterface): NotificationsLog{
    return new NotificationsLog(data);
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
      name: 'NotificationsLog',
      plural: 'NotificationsLogs',
      path: 'NotificationsLogs',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "text": {
          name: 'text',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "createdDateTime": {
          name: 'createdDateTime',
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
