import { SupplierModel } from "./master.interfaces";
import { OFACModel, OffshoreModel, WorldBankModel } from "./master.interfaces"

export interface ResponseModel {
    isSuccess: boolean;
}

export interface SupplierResponse {
    Suppliers: SupplierModel[],
    Message: string,
}

export interface TokenResponse {
	token: string
}

export interface OffshoreResponse {
	hits: number,
	rows: OffshoreModel[],
}

export interface WorldBankResponse {
	hits: number,
	rows: WorldBankModel[],
}

export interface OFACResponse {
	hits: number,
	rows: OFACModel[],
    message: string,
}