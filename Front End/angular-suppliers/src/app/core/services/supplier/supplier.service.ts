import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierModel } from 'src/app/shared/models/interfaces/master.interfaces';
import { UrlConstants } from '../../global/constants/url.constants';
import { ResponseModel } from 'src/app/shared/models/interfaces/response.interfaces';
import { SupplierResponse } from 'src/app/shared/models/interfaces/response.interfaces';

@Injectable({
	providedIn: 'root',
})
export class SupplierService {
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};
	constructor(private httpClient: HttpClient) {}

	getSuppliers(): Observable<SupplierResponse> {
		return this.httpClient.get<SupplierResponse>(
			UrlConstants.URL_SUPPLIERS
		);
	}

	addSupplier(supplier: SupplierModel): Observable<ResponseModel> {
		return this.httpClient.post<ResponseModel>(
			UrlConstants.URL_SUPPLIERS,
			supplier,
			this.httpOptions
		);
	}

	editSupplier(supplier: SupplierModel): Observable<ResponseModel> {
		return this.httpClient.put<ResponseModel>(
			UrlConstants.URL_SUPPLIERS,
			supplier,
			this.httpOptions
		);
	}

	deleteSupplier(supplierJson: string): Observable<ResponseModel> {
		let supplier = JSON.parse(supplierJson);
		return this.httpClient.delete<ResponseModel>(
			`${UrlConstants.URL_SUPPLIERS}/${supplier.id}`
		);
	}
}
