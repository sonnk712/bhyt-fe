import {ApiResponse} from "./common";

export interface FormInformationResponse extends ApiResponse {
  code: number,
  message: string,
  transactionId: string,
  data: FormInformation[]
}
export interface FormInformationRequest {
  id: string;
  code: string;
  name: string;
  makeCopies: number;
  description: string;
  required: number;
  valueType: number;
  formInformationType: number;
  status: number;
}
export interface FormInformation {
  id: string;
  code: string;
  name: string;
  makeCopies: number;
  description: string;
  formInformationType: number;
  required: number;
  updatedDate: string;
  valueType: number;
  status: number;
  nameField: string;
}
export interface FormInformationRequestSearch {
  searchText: string;
}
export interface FormInformationCreateRequest {
  code: string;
  name: string;
  makeCopies: number;
  description: string;
  nameField: string;
  required: number;
  valueType: number;
  formInformationType: number;
  status: number;
}
export interface DropList {
  code: number;
  name: string;
}
export interface ListId {
  listId: string[]
}
export interface ListFormInformation {
  id: string,
  code: string,
  name:string
}

export interface ListFormInformationResponse extends ApiResponse {
  code: number,
  message: string,
  transactionId: string,
  data: ListFormInformation[]
}
