import {ApiResponse} from "./common";
import { FormInformation } from "./form-information";
export interface ServicePackageDetailResponse extends ApiResponse {
  code: number,
  message: string,
  transactionId: string,
  data: ServicePackageDetail
}
export interface ServicePackageListResponse extends ApiResponse {
  code: number,
  message: string,
  transactionId: string,
  data: ServicePackageList[]
}
export interface ServicePackageDetail {
    id: string;
	code: string;
	name: string;
	price: number;
	promotionsPercent: number;
	device: string;
	keyLength: number;
	algorithm: string;
	agency: ServicePackageComboboxRequest;
	ca: ServicePackageComboboxRequest;
	formName: string;
	informationForm: ListInformationForm[];
  time: CertTime[] ;
	updatedDate: Date;
	updatedUser: string;
  }
export interface ServicePackageList {
  id: string;
	code: string;
	name: string;
	price: number;
	promotionsPercent: number;
	device: string;
	keyLength: number;
	algorithm: string;
	agencyName: string;
	caName: string;
	formName: string;
	updatedDate: string;
	updatedUser: string;
  }
  export interface ServicePackageListRequestSearch {
    searchText: string;
  }
  export interface ServicePackageRequest {
    id: string;
	code: string;
	name: string;
	price: number;
	promotionsPercent: number;
	device: string;
	keyLength: string;
	algorithm: string;
	agencyCode: string;
	caCode: string;
	formCode: string;
	time: CertTime[] ;
  }
  export interface ServicePackageComboboxRequest {
    code: string;
    name: string;
  }
  export interface ListInformationForm {
    id: string
    code: number;
    name: string;
  }
  export interface ListServicePackageCombobox {
    id: string
    code: number;
    name: string;
  }
  export interface ListId {
    listId: string[]
  }

  export interface CertTime {
    code: string;
    timeDuration: number;
    timeUnit: string
  }

  export interface RequestSearch {
    searchText: string;
  }