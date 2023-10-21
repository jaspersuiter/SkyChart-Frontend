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

import { AirplaneUpdateViewModel, AirplaneViewModel, PlaneForm } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Plane<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Airplane
   * @name PlaneCreateCreate
   * @request POST:/api/plane/create
   */
  planeCreateCreate = (data: PlaneForm, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/plane/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Airplane
   * @name PlaneUpdateUpdate
   * @request PUT:/api/plane/update
   */
  planeUpdateUpdate = (data: AirplaneUpdateViewModel, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/plane/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Airplane
   * @name PlaneGetList
   * @request GET:/api/plane/get
   */
  planeGetList = (
    query?: {
      /** @format uuid */
      planeId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/plane/get`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Airplane
   * @name PlaneGetAllList
   * @request GET:/api/plane/get-all
   */
  planeGetAllList = (params: RequestParams = {}) =>
    this.request<AirplaneViewModel[], any>({
      path: `/api/plane/get-all`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Airplane
   * @name PlaneDeleteDelete
   * @request DELETE:/api/plane/delete
   */
  planeDeleteDelete = (
    query?: {
      /** @format uuid */
      planeId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/plane/delete`,
      method: "DELETE",
      query: query,
      ...params,
    });
}
