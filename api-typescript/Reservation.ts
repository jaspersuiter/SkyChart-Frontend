/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ReservationCreateForm, ReservationViewModel } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Reservation<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Reservation
   * @name ReservationCreateCreate
   * @request POST:/api/reservation/create
   */
  reservationCreateCreate = (data: ReservationCreateForm, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/reservation/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reservation
   * @name ReservationUpdateUpdate
   * @request PUT:/api/reservation/update
   */
  reservationUpdateUpdate = (data: ReservationViewModel, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/reservation/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reservation
   * @name ReservationGetList
   * @request GET:/api/reservation/get
   */
  reservationGetList = (
    query?: {
      /** @format date */
      startDate?: string;
      /** @format date */
      endDate?: string;
      userId?: string;
      planeId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/reservation/get`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Reservation
   * @name ReservationDeleteDelete
   * @request DELETE:/api/reservation/delete
   */
  reservationDeleteDelete = (
    query?: {
      /** @format uuid */
      reservationId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/reservation/delete`,
      method: "DELETE",
      query: query,
      ...params,
    });
}
