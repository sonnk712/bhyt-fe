import { ApiResponse } from "./common";


export interface ProfileResponse extends ApiResponse {
    code: number,
    message: string,
    data: ProfileInformation[]
}


export interface ProfileResponseV2 extends ApiResponse {
    code: number,
    message: string,
    data: ProfileInfoResponse
}

export interface ProfileInfoResponse {
    totalCost: number,
    profileInfo: ProfileInformation[]
}



export interface ProfileInformation {
    id: string,
    cccd: string,
    name: string,
    cost: number,
    type: TypeCombobox,
    paidDate: Date,
    contact: string,
    status: number
    // district?: DistrictCombobox,
    // ward?: WardCombobox,
}

export interface TypeCombobox {
    id: string
    code: string,
    name: string,
}

export interface TypeRequestSearch {
    textSearch: string;
    districtCode: string,
    wardCode: string
}