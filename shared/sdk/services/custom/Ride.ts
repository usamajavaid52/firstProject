/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SDKModels } from './SDKModels';
import { BaseLoopBackApi } from '../core/base.service';
import { LoopBackConfig } from '../../lb.config';
import { LoopBackAuth } from '../core/auth.service';
import { LoopBackFilter,  } from '../../models/BaseModels';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Ride } from '../../models/Ride';
import { SocketConnection } from '../../sockets/socket.connections';


/**
 * Api services for the `Ride` model.
 */
@Injectable()
export class RideApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) protected http: Http,
    @Inject(SocketConnection) protected connection: SocketConnection,
    @Inject(SDKModels) protected models: SDKModels,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) {
    super(http,  connection,  models, auth, searchParams, errorHandler);
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param {object} data Request data.
   *
   *  - `rideId` – `{string}` - 
   *
   *  - `orderId` – `{string}` - 
   *
   *  - `status` – `{string}` - 
   *
   * @returns {object} An empty reference that will be
   *   populated with the actual data once the response is returned
   *   from the server.
   *
   * Data properties:
   *
   *  - `rideId` – `{string}` - 
   *
   *  - `orderId` – `{string}` - 
   *
   *  - `status` – `{string}` - 
   */
  public rideUpdate(rideId: any = {}, orderId: any = {}, status: any = {}, customHeaders?: Function): Observable<any> {
    let _method: string = "POST";
    let _url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
    "/Rides/rideUpdate";
    let _routeParams: any = {};
    let _postBody: any = {};
    let _urlParams: any = {};
    if (typeof rideId !== 'undefined' && rideId !== null) _urlParams.rideId = rideId;
    if (typeof orderId !== 'undefined' && orderId !== null) _urlParams.orderId = orderId;
    if (typeof status !== 'undefined' && status !== null) _urlParams.status = status;
    let result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Ride`.
   */
  public getModelName() {
    return "Ride";
  }
}
