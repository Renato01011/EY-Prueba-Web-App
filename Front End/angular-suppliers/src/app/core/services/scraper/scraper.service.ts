import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlConstants } from '../../global/constants/url.constants';
import { Observable } from 'rxjs';
import { OFACResponse, OffshoreResponse, WorldBankResponse } from 'src/app/shared/models/interfaces/response.interfaces';

@Injectable({
	providedIn: 'root'
})
export class ScraperService {

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};
	constructor(private httpClient: HttpClient) {}

	getOffshoreReference(supplierJson: string): Observable<OffshoreResponse> {
		let supplier = JSON.parse(supplierJson);
		const body = { 'name': supplier.name };
		return this.httpClient.post<OffshoreResponse>(
			UrlConstants.URL_SCRAPER_OFFSHORE,
			body,
			this.httpOptions
		);
	}

	getWorldBankReference(supplierJson: string): Observable<WorldBankResponse> {
		let supplier = JSON.parse(supplierJson);
		const body = { 'name': supplier.name };
		return this.httpClient.post<WorldBankResponse>(
			UrlConstants.URL_SCRAPER_WORLDBANK,
			body,
			this.httpOptions
		);
	}

	getOFACReference(supplierJson: string): Observable<OFACResponse> {
		let supplier = JSON.parse(supplierJson);
		const body = { 'name': supplier.name };
		return this.httpClient.post<OFACResponse>(
			UrlConstants.URL_SCRAPER_OFAC,
			body,
			this.httpOptions
		);
	}
}
