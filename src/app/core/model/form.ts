import {ApiResponse} from "./common";
import { FormInformation, ListFormInformation } from "./form-information";
export interface FormDetailResponse extends ApiResponse {
  code: number,
  message: string,
  transactionId: string,
  data: FormDetail
}
export interface FormFilterResponse extends ApiResponse {
  code: number,
  message: string,
  transactionId: string,
  data: FormFilter[]
}
export interface FormFilter {
    id: string,
    code: string;
    name: string;
    description: string;
    certificateType: number;
    updatedDate: string;
    status: number;
  }
export interface FormDetail {
    id: string,
    code: string;
    name: string;
    certificateType: number;
    description: string;
    status: number;
    updatedDate: string;
    informationForm: ListFormInformation[]
  }
  export interface FormRequestSearch {
    searchText: string;
  }
  export interface FormCreateRequest {
    code: string;
    name: string;
    certificateType: number;
    description: string;
    status: number;
    informationForm: ListFormInformation[]
  }
  export interface DropList {
    code: number;
    name: string;
  }
  export interface ListForm {
    id: string
    code: number;
    name: string;
  }
  export interface ListId {
    listId: string[]
  }

  export interface FormUpdate {
    id: string,
    code: string;
    name: string;
    certificateType: number;
    description: string;
    status: number;
    informationForm: ListFormInformation[]
  }