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

import { AvailabilityForm, AvailabilityViewModel } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Availability<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Availability
   * @name AvailabilityCreateCreate
   * @request POST:/api/availability/create
   */
  availabilityCreateCreate = (data: AvailabilityForm, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/availability/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Availability
   * @name AvailabilityUpdateUpdate
   * @request PUT:/api/availability/update
   */
  availabilityUpdateUpdate = (data: AvailabilityViewModel, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/availability/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Availability
   * @name AvailabilityGetList
   * @request GET:/api/availability/get
   */
  availabilityGetList = (
    query?: {
      /** @format uuid */
      userId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/availability/get`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Availability
   * @name AvailabilityDeleteDelete
   * @request DELETE:/api/availability/delete
   */
  availabilityDeleteDelete = (
    query?: {
      /** @format uuid */
      availabilityId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/availability/delete`,
      method: "DELETE",
      query: query,
      ...params,
    });
}
