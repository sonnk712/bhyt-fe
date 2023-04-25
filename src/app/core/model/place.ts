

import {ApiResponse} from "./common";

export interface Country {
  id: string,
  code: string,
  name: string
}

export interface District {
  code: string,
  codeName: string,
  fullName: string
}

export interface Province {
  code: string,
  codeName: string,
  fullName: string
}

export interface Ward {
  code: string,
  codeName: string,
  fullName: string
}

export interface CountryResponse extends ApiResponse{
  data: Country [],
}

export interface Provine {
  code: string,
  countryId: string,
  id: string,
  name: string
}
export interface ProvineResponse extends ApiResponse{
  data: Provine [],
}

export interface ProvineResponseV2 extends ApiResponse{
  data: ProvinceCombobox [],
}
export interface ProvinceCombobox {
  code: string,
  codeName: string,
  name: string,
  fullName: string
}

export interface DistrictResponse extends ApiResponse{
  data: DistrictCombobox [],
}

export interface WardResponse extends ApiResponse{
  data: DistrictCombobox [],
}

export interface WardCombobox {
  code: string,
  codeName: string,
  name: string,
  fullName: string
}

export interface DistrictCombobox {
  code: string,
  codeName: string,
  name: string,
  fullName: string
}

export interface WardCombobox {
  code: string,
  codeName: string,
  name: string,
  fullName: string
}

export interface DistrictComboboxRequest {
  provinceCode: string,
}


export interface WardComboboxRequest {
  districtCode: string,
}

export interface PeriodResponse extends ApiResponse{
  data: PeriodCombobox [],
}

export interface PeriodCombobox {
  id: string,
  code: string,
  name: string,
  month: number
}

export interface PeriodSearchRequest {
  month: number,
  textSearch: string
}

export interface TypeCombobox {
  id: string,
  code: string,
  name: string,
}

export interface TypeResponse extends ApiResponse{
  data: TypeCombobox [],
}

export interface TypeSearchRequest {
  id: string,
  textSearch: string
}

export interface StatusSearchRequest {
  id: string,
  textSearch: string
}


export interface PeriodInfomationResponse extends ApiResponse{
  data: PeriodInformation [],
}

export interface PeriodInformation {
  id: string,
  code: string,
  name: string,
  month: number,
  status: number,
  createdDate: Date,
  updatedDate: Date
}

export interface PeriodTextSearch {
  textSearch: string
}

export interface CostUnitInfomationResponse extends ApiResponse{
  data: CostUnitInformation [],
}


export interface CostUnitInformation {
  id: string,
  code: string,
  name: string,
  cost: number,
  status: number,
  createdDate: Date,
  updatedDate: Date
}