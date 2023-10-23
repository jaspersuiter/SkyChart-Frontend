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

import { InstructorViewModel } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Instructor<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name InstructorGetAllList
   * @request GET:/api/instructor/get-all
   */
  instructorGetAllList = (params: RequestParams = {}) =>
    this.request<InstructorViewModel[], any>({
      path: `/api/instructor/get-all`,
      method: "GET",
      format: "json",
      ...params,
    });
}
