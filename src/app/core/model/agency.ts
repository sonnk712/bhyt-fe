
import { ApiResponse } from "./common";
import { FileInfo } from "./media";
import { DistrictCombobox, ProvinceCombobox, WardCombobox } from "./place";

export interface AgencyResponse extends ApiResponse {
    code: number,
    message: string,
    transactionId: string,
    data: AgencyInformation
}

export interface AgencyDetailResponse extends ApiResponse {
    code: number,
    message: string,
    data: AgencyDetailInformationV2
}

export interface AgencyResponseV2 extends ApiResponse {
    code: number,
    message: string,
    data: AgencyInformationV2[]
}

export interface AgencyInformation {
    id?: string,
    code?: string,
    name?: string,
    provinceAgent?: string,
    children?: Field[]
}

export interface AgencyDetailInformationV2 {
    id: string,
    code: string,
    name: string,
    receivingPlace: string,
    person: string,
    phoneNumber: string,
    address: string,
    status: number,
    createdDate: Date,
    updatedDate: Date,
    district: DistrictCombobox,
    ward: WardCombobox,
    province: ProvinceCombobox
}

export interface AgencyInformationV2 {
    id: string,
    code: string,
    name: string,
    receivingPlace: string,
    person: string,
    phoneNumber: string,
    address: string,
    // district?: DistrictCombobox,
    // ward?: WardCombobox,
}

export interface AgencyRequestSearchV2 {
    textSearch: string;
    districtCode: string,
    wardCode: string
}

export interface Field {
    id?: string;
    code?: string;
    label?: string;
    children?: Field[]
}

export interface AgencyRequestSearch {
    textSearch: string;
    province: {
        id: string;
        code: string;
        name: string;
    }
    managementAgent: {
        id: string;
        code: string;
        name: string;
    },
    status: number
}

export interface AgencyRequest {
    code: string;
    name: string;
    address: string;
    email: string;
    taxCode: string;
    phoneNumber: string;
    managementAgent?: {
        id?: string;
        code?: string;
        name?: string;
    };
    provinceAgent: string;
    countryAgent: string;
    businessLicenseImage: FileInfo;
    userInfo: {
        nameRepresentative: string;
        emailRepresentative: string;
        phoneNumberRepresentative: string;
        currentAddressRepresentative: string;
        identityNumberRepresentative: string;
        provinceRepresentative: string;
        countryRepresentative: string;
        positionRepresentative: string;
        permanentAddressRepresentative: string;
    };
    autoApprove: number;
}

export interface AgencyRequestV2 {
    code: string;
    name: string;
    receivingPlace: string;
    person: string;
    phoneNumber: string;
    address: string;
    districtCode: string;
    wardCode: string;    
}

