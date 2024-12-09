import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { TokenResponse } from 'src/app/shared/models/interfaces/response.interfaces';
import { UrlConstants } from '../../global/constants/url.constants';
import { STORAGE_CURRENT_TOKEN } from '../../global/constants/constants';
import { Observable } from 'rxjs';
import { Payload } from 'src/app/shared/models/interfaces/payload.interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		}),
	};

	constructor(
		private httpClient: HttpClient,
		public jwtHelper: JwtHelperService
	) {}

	loginUser(username: string, password: string): Observable<TokenResponse> {
		return this.httpClient.post<TokenResponse>(
			UrlConstants.URL_LOGIN_TOKEN,
			{
				Username: username,
				Password: password,
			},
			this.httpOptions
		);
	}

	public isAuthenticated(): boolean {
		if (sessionStorage.getItem(STORAGE_CURRENT_TOKEN) == null) {
			return false;
		}
		const token = JSON.parse(
			sessionStorage.getItem(STORAGE_CURRENT_TOKEN) || '{}'
		);
		return !this.jwtHelper.isTokenExpired(token);
	}

	private decodeToken(): Payload | null {
		try {
			return this.jwtHelper.decodeToken(this.getTokenFromStorage());
		} catch (error) {
			console.error('Decoding has failed');
			return null;
		}
	}

	private getTokenFromStorage(): string {
		const token = sessionStorage.getItem(STORAGE_CURRENT_TOKEN);
		if (!token) throw new Error('Token is not found');
		return token;
	}

	public get payload(): any {
		return this.decodeToken();
	}

	public get username(): string {
		const username = this.decodeToken()?.sub ?? '';
		return username;
	}
}
