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

import { UserCreateForm, UserLoginModel, UserViewModel } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags User
   * @name UserCreateCreate
   * @request POST:/api/user/create
   */
  userCreateCreate = (
    query?: {
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/user/create`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserRegisterCreate
   * @request POST:/api/user/register
   */
  userRegisterCreate = (
    data: UserCreateForm,
    query?: {
      verificationCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/user/register`,
      method: "POST",
      query: query,
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserGetList
   * @request GET:/api/user/get
   */
  userGetList = (
    query?: {
      /** @format uuid */
      userId?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/user/get`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserUpdateUpdate
   * @request PUT:/api/user/update
   */
  userUpdateUpdate = (data: UserViewModel, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserAuthenticationLoginCreate
   * @request POST:/api/user/authentication/login
   */
  userAuthenticationLoginCreate = (data: UserLoginModel, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/authentication/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserAuthenticationLogoutCreate
   * @request POST:/api/user/authentication/logout
   */
  userAuthenticationLogoutCreate = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/authentication/logout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserAuthenticationAuthVerificationList
   * @request GET:/api/user/authentication/auth-verification
   */
  userAuthenticationAuthVerificationList = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/user/authentication/auth-verification`,
      method: "GET",
      ...params,
    });
}
