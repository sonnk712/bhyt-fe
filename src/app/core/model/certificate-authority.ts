import { ApiResponse } from "./common";

export interface CaResponse extends ApiResponse{
    code: number,
    message: string,
    transactionId: string,
    data: CaInformation[]
}

export interface CaTableRowSelect {
    data: CaInformation;
    index?: number;
    originalEvent: Event;
    type: string;
  }

export interface CaInformation {
    id: string,
    code?: string,
    name?: string,
    country?: Country,
    createdUser?: string,
    createdDate?: Date,
    updatedUser?: string,
    updatedDate?: Date,
    status?: number
}

export interface Country {
    id?: string,
    code?: string,
    name?: string
}

export interface DeleteRequest {
    listId: string[]
    // status: number
}

export interface CaRequestSearch {
    textSearch: string;
    // status: number
}

export interface CaRequest {
    code?: string;
    name?: string;
    country?: Country;
    status?: number;
}