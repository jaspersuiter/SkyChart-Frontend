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

export interface AirplaneUpdateViewModel {
  /** @format uuid */
  planeId?: string;
  nickName?: string | null;
  /** @format float */
  hourlyRate?: number | null;
  /** @format int32 */
  numEngines?: number | null;
  /** @format float */
  tachHours?: number | null;
  /** @format float */
  hobbsHours?: number | null;
  grounded?: boolean | null;
}

export interface AirplaneViewModel {
  /** @format uuid */
  planeId?: string;
  tailNumber?: string;
  model?: string;
  nickName?: string | null;
  /** @format float */
  hourlyRate?: number;
  /** @format int32 */
  numEngines?: number;
  /** @format float */
  tachHours?: number;
  /** @format float */
  hobbsHours?: number;
  grounded?: boolean;
}

export interface AvailabilityForm {
  day?: Days;
  startTime?: string;
  endTime?: string;
  type?: AvailabilityType;
}

export enum AvailabilityType {
  PreferredTime = "PreferredTime",
  Available = "Available",
}

export interface AvailabilityViewModel {
  /** @format uuid */
  availabilityId?: string;
  day?: Days;
  startTime?: string;
  endTime?: string;
  /** @format uuid */
  userId?: string;
  type?: AvailabilityType;
}

export enum Days {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export enum FlightType {
  DualLesson = "DualLesson",
  StudentSolo = "StudentSolo",
  Checkride = "Checkride",
  StandardReserved = "StandardReserved",
  AircraftCheckout = "AircraftCheckout",
  GroundSchool = "GroundSchool",
}

export enum InstructorRatings {
  CFI = "CFI",
  CFII = "CFII",
}

export interface InstructorViewModel {
  /** @format uuid */
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  instructorRatings?: InstructorRatings[];
}

export interface PlaneForm {
  tailNumber?: string;
  model?: string;
  nickName?: string | null;
  /** @format float */
  hourlyRate?: number;
  /** @format int32 */
  numEngines?: number;
  /** @format float */
  tachHours?: number;
  /** @format float */
  hobbsHours?: number;
}

export interface ReservationCreateForm {
  planeId?: string | null;
  instructorId?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  flightType?: FlightType;
}

export interface ReservationViewModel {
  /** @format uuid */
  reservationId?: string;
  pilotId?: string | null;
  planeId?: string | null;
  instructorId?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  flightType?: FlightType;
}

export interface UserCreateForm {
  username?: string | null;
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhoneNumber?: string | null;
}

export interface UserLoginModel {
  /** @minLength 1 */
  usernameOrEmail: string;
  /** @minLength 1 */
  password: string;
}

export interface UserViewModel {
  username?: string | null;
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  emergencyContactName?: string | null;
  type?: string | null;
  emergencyContactPhoneNumber?: string | null;
  /** @format uuid */
  preferredInstructorId?: string | null;
  preferredInstructor?: InstructorViewModel;
  preferredPlanes?: string[] | null;
}
