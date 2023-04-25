import {ApiResponse} from "./common";

export interface RaItemInfo {
  serialNumber: string;
  subjectDn: string;
  status: string;
  validFrom: string;
  validTo: string;
  updatedDate: string;
  agencyName: string;
}

export interface CountStatusItem {
  status: number;
  count: number;
}

export interface DataSearchStatistic {
  total: number;
  countStatus: CountStatusItem [];
  listData: InsuranceInfo[];
}

export interface DataSearchStatisticRequest {
  searchText: string;
  status: number [];
  startDate: string;
  endDate: string;
}

export interface DataSearchStatisticResponse extends ApiResponse {
  data: DataSearchStatistic
}

export interface InsuranceInfo {
  identityId: string,
  name: string,
  issuerName: string,
  status: number,
  validFrom: string,
  validTo: string,
  updatedDate: string
}