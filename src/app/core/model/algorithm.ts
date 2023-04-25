import { ApiResponse } from "./common";

export interface AlgorithmResponse extends ApiResponse{
    code: number,
    message: string,
    transactionId: string,
    data: AlgorithmInformation[]
}

export interface AlgorithmInformation {
    id?: string,
    code?: string,
    name?: string
}

export interface AlgorithmRequestSearch {
    textSearch: string;
    // status: number
}

export interface AlgorithmRequest {
    code: string;
    name: string;
    autoApprove: number;
}
